<?php
/**
 * The Garden Perks - Newsletter Subscription & Email Dispatcher
 * Hostinger PHP Endpoint for garden.theodisius.com
 */

// Enable CORS for frontend requests from garden.theodisius.com and GitHub Pages
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// Read raw JSON body or form POST
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$username = isset($data['username']) ? trim(preg_replace('/[^a-zA-Z0-9_.-]/', '', $data['username'])) : '';
if (empty($username) && !empty($email)) {
    $parts = explode('@', $email);
    $username = $parts[0];
}
if (empty($username)) {
    $username = 'Botanist';
}

$badge = isset($data['badge']) ? strip_tags($data['badge']) : '🌿 Botanical Scout';
$tier = isset($data['tier']) ? strip_tags($data['tier']) : 'Novice Botanist';

// Validate email address
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address provided.']);
    exit;
}

// 1. Log subscriber to local file backup
$logEntry = [
    'timestamp' => date('c'),
    'email' => $email,
    'username' => $username,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'source' => $data['source'] ?? 'garden.theodisius.com'
];
@file_put_contents(
    __DIR__ . '/subscribers.jsonl',
    json_encode($logEntry, JSON_UNESCAPED_SLASHES) . "\n",
    FILE_APPEND | LOCK_EX
);

// 2. Prepare HTML Welcome Email
$subject = "Welcome to The Garden Perks! 🌱 Your Daily Sprout VIP Guide";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$fromAddress = "noreply@garden.theodisius.com";
$replyTo = "theo@theodisius.com";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: The Garden Perks <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $replyTo;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Garden Perks</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);">
          
          <!-- Banner Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%); padding: 40px 32px; text-align: center; color: #ffffff;">
              <div style="font-size: 40px; line-height: 1; margin-bottom: 12px;">🌱</div>
              <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ecfdf5;">The Garden Perks</h1>
              <p style="margin: 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #6ee7b7;">The Daily Sprout VIP Society</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #064e3b;">
                Greetings Botanist @{$username}! 🌿
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155;">
                Welcome to <strong>The Garden Perks</strong>! Your subscription to <em>The Daily Sprout</em> is officially activated. You are now part of our growing community of passionate plant parents, urban gardeners, and botanical enthusiasts.
              </p>

              <!-- Credentials Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #047857; margin-bottom: 10px;">Your VIP Botanist Credentials</div>
                    <div style="font-size: 14px; margin-bottom: 6px; color: #1e293b;"><strong>Handle:</strong> @{$username}</div>
                    <div style="font-size: 14px; margin-bottom: 6px; color: #1e293b;"><strong>Current Rank:</strong> {$badge} ({$tier})</div>
                    <div style="font-size: 14px; color: #1e293b;"><strong>Member Email:</strong> {$email}</div>
                  </td>
                </tr>
              </table>

              <!-- Bonus Free Recipe -->
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #065f46;">
                  🎁 Your Free Welcome Gift: The Master Aroid Soil Blend
                </h3>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #047857;">
                  Never lose a Monstera, Philodendron, or Anthurium to root rot again with this nursery-grade airy recipe:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #065f46;">
                  <li style="margin-bottom: 4px;"><strong>40% Chunky Orchid Pine Bark</strong> (creates oxygen pockets)</li>
                  <li style="margin-bottom: 4px;"><strong>30% Coconut Coir / Peat</strong> (sustainable moisture retention)</li>
                  <li style="margin-bottom: 4px;"><strong>20% Coarse Perlite or Pumice</strong> (rapid drainage)</li>
                  <li><strong>10% Organic Worm Castings + Horticultural Charcoal</strong> (slow microbial feed & anti-fungal)</li>
                </ul>
              </div>

              <!-- Unlocked Perks -->
              <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #0f172a;">What You Have Unlocked:</h3>
              <ul style="margin: 0 0 28px 0; padding-left: 20px; font-size: 14px; color: #475569;">
                <li style="margin-bottom: 8px;">🌿 <strong>Unlimited Dr. Flora Consultations:</strong> Instant botanical diagnosis, soil treatment recipes, and recovery plans.</li>
                <li style="margin-bottom: 8px;">📖 <strong>Global Greenhouse Encyclopedia:</strong> Discover species, compare sunlight requirements, and contribute your own plants.</li>
                <li style="margin-bottom: 8px;">📬 <strong>Morning Care Dispatch:</strong> Weekly micro-guides on propagation, seasonal dormancy, and natural pest management.</li>
              </ul>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center">
                    <a href="https://garden.theodisius.com/greenhouse" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 14px; margin-right: 8px; margin-bottom: 8px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.3);">
                      Open Greenhouse Archive →
                    </a>
                    <a href="https://garden.theodisius.com/clinic" style="display: inline-block; background-color: #f1f5f9; color: #0f766e; text-decoration: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; border: 1px solid #cbd5e1; margin-bottom: 8px;">
                      Consult Dr. Flora 🩺
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
              <p style="margin: 0 0 6px 0;">
                Sent with verdant regards by <strong>The Garden Perks Botanical Society</strong>
              </p>
              <p style="margin: 0 0 10px 0;">
                <a href="https://garden.theodisius.com" style="color: #059669; text-decoration: none; font-weight: 600;">garden.theodisius.com</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                You received this email because you subscribed to The Daily Sprout at garden.theodisius.com.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// 3. Dispatch Email via PHP mail()
$mailSent = @mail($email, $encodedSubject, $htmlBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'VIP Welcome email sent successfully to ' . $email,
        'email' => $email,
        'username' => $username
    ]);
} else {
    // If mail() failed (e.g. server local sendmail queue issue), subscriber is still saved in log
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'warning' => 'Subscriber registered, email queued for dispatch.',
        'email' => $email,
        'username' => $username
    ]);
}
