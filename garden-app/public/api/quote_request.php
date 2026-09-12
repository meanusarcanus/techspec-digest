<?php
/**
 * TechSpec Digest - High-Ticket Pay-Per-Lead (PPL) Dispatcher & Storage
 * Hostinger PHP Endpoint for garden.theodisius.com / theodisius.com
 */

// Enable CORS for frontend requests from digest.theodisius.com, garden.theodisius.com, and localhost
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

// Read raw JSON body
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload.']);
    exit;
}

// Sanitize inputs
$fullName = isset($data['fullName']) ? trim(strip_tags($data['fullName'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$zip = isset($data['zip']) ? trim(preg_replace('/[^0-9]/', '', $data['zip'])) : '';
$homeOwnership = isset($data['homeOwnership']) ? trim(strip_tags($data['homeOwnership'])) : 'Homeowner (Own)';
$electricBill = isset($data['electricBill']) ? trim(strip_tags($data['electricBill'])) : '$250 - $400 / month';

// Sizing specifications from calculator
$systemSizeKwh = isset($data['systemSizeKwh']) ? trim(strip_tags($data['systemSizeKwh'])) : 'Unknown';
$continuousKw = isset($data['continuousKw']) ? trim(strip_tags($data['continuousKw'])) : 'Unknown';
$maxSurgeKw = isset($data['maxSurgeKw']) ? trim(strip_tags($data['maxSurgeKw'])) : 'Unknown';
$requires240V = !empty($data['requires240V']) ? 'Yes (240V Split-Phase Heavy Duty)' : 'No (120V Standard)';
$recommendedHardware = isset($data['recommendedHardware']) ? trim(strip_tags($data['recommendedHardware'])) : 'EcoFlow DELTA Pro Ultra';
$durationHours = isset($data['durationHours']) ? trim(strip_tags($data['durationHours'])) : '48 Hours';
$taxCreditSavings = isset($data['taxCreditSavings']) ? trim(strip_tags($data['taxCreditSavings'])) : '$0';

// Validation
if (empty($fullName) || strlen($fullName) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid full name.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

if (empty($phone) || strlen($phone) < 7) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid contact phone number.']);
    exit;
}

if (empty($zip) || strlen($zip) < 5) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid 5-digit US Zip Code.']);
    exit;
}

$leadId = 'LEAD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
$timestamp = date('Y-m-d H:i:s T');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// 1. Log Lead to secure local JSON file
$logFile = __DIR__ . '/leads_battery.json';
$leadRecord = [
    'leadId' => $leadId,
    'timestamp' => $timestamp,
    'fullName' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'zip' => $zip,
    'homeOwnership' => $homeOwnership,
    'electricBill' => $electricBill,
    'systemSizeKwh' => $systemSizeKwh,
    'continuousKw' => $continuousKw,
    'maxSurgeKw' => $maxSurgeKw,
    'requires240V' => $requires240V,
    'recommendedHardware' => $recommendedHardware,
    'durationHours' => $durationHours,
    'taxCreditSavings' => $taxCreditSavings,
    'ip' => $ip,
    'source' => 'digest.theodisius.com/posts/whole-home-battery-storage-sizing-calculator/'
];

$existingLeads = [];
if (file_exists($logFile)) {
    $existingContent = file_get_contents($logFile);
    $existingLeads = json_decode($existingContent, true) ?: [];
}
$existingLeads[] = $leadRecord;
file_put_contents($logFile, json_encode($existingLeads, JSON_PRETTY_PRINT));

// 2. Automated Webhook & Google Sheets Dispatcher
$configFile = __DIR__ . '/lead_config.json';
$webhookUrl = '';
if (file_exists($configFile)) {
    $configData = json_decode(file_get_contents($configFile), true);
    if (!empty($configData['webhook_url'])) {
        $webhookUrl = trim($configData['webhook_url']);
    }
}

if (!empty($webhookUrl)) {
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($leadRecord));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'User-Agent: TechSpec-Lead-Engine/1.0'
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5); // 5 second non-blocking timeout
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    @curl_exec($ch);
    @curl_close($ch);
}

// 3. Dispatch Real-Time Alert to tednadres@theodisius.com
$adminEmail = 'tednadres@theodisius.com';
$adminSubject = "⚡ High-Ticket Lead [#{$leadId}]: {$fullName} ({$zip}) — {$systemSizeKwh} kWh Battery";

$adminHeaders = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: TechSpec Digest Lead Engine <theo@theodisius.com>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

$adminHtml = "
<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; max-width: 620px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;'>
  <div style='background: linear-gradient(135deg, #0284c7, #2563eb); padding: 24px; text-align: center;'>
    <h2 style='margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 0.5px;'>⚡ New High-Ticket Sizing Lead</h2>
    <p style='margin: 6px 0 0 0; color: #bfdbfe; font-size: 13px;'>Reference: <strong>{$leadId}</strong> • {$timestamp}</p>
  </div>
  
  <div style='padding: 24px;'>
    <h3 style='color: #38bdf8; font-size: 14px; text-transform: uppercase; margin-top: 0;'>👤 Customer Contact Details</h3>
    <table style='width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;'>
      <tr><td style='padding: 6px 0; color: #94a3b8; width: 140px;'>Full Name:</td><td style='color: #ffffff; font-weight: 700;'>{$fullName}</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Phone Number:</td><td style='color: #38bdf8; font-weight: 700;'><a href='tel:{$phone}' style='color: #38bdf8; text-decoration: none;'>{$phone}</a></td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Email Address:</td><td style='color: #ffffff;'><a href='mailto:{$email}' style='color: #38bdf8;'>{$email}</a></td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Zip Code:</td><td style='color: #facc15; font-weight: 700;'>{$zip}</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Property Status:</td><td style='color: #ffffff;'>{$homeOwnership}</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Avg Electric Bill:</td><td style='color: #34d399; font-weight: 700;'>{$electricBill}</td></tr>
    </table>

    <hr style='border: 0; border-top: 1px solid #334155; margin: 20px 0;'>

    <h3 style='color: #f59e0b; font-size: 14px; text-transform: uppercase; margin-top: 0;'>🔋 Engineering Sizing Spec</h3>
    <table style='width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;'>
      <tr><td style='padding: 6px 0; color: #94a3b8; width: 140px;'>Calculated Capacity:</td><td style='color: #38bdf8; font-weight: 800; font-size: 16px;'>{$systemSizeKwh} kWh</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Continuous Load:</td><td style='color: #ffffff;'>{$continuousKw} kW</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Peak Inrush Surge:</td><td style='color: #ffffff;'>{$maxSurgeKw} kW</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>240V Requirement:</td><td style='color: #f87171;'>{$requires240V}</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Hardware Fit:</td><td style='color: #ffffff;'>{$recommendedHardware}</td></tr>
      <tr><td style='padding: 6px 0; color: #94a3b8;'>Est. 30% Tax Credit:</td><td style='color: #34d399; font-weight: 700;'>{$taxCreditSavings}</td></tr>
    </table>

    <div style='background: #1e293b; padding: 14px; border-radius: 10px; font-size: 12px; color: #94a3b8;'>
      <strong>Monetization Note:</strong> Forward this lead to certified local installers in zip code <strong>{$zip}</strong> or submit to your PPL affiliate network portal for instant credit.
    </div>
  </div>
</div>
";

@mail($adminEmail, $adminSubject, $adminHtml, implode("\r\n", $adminHeaders));

// 3. Dispatch Professional Confirmation Email to Homeowner
$userSubject = "Your Home Battery Sizing Spec & Installation Quote Request [#{$leadId}]";
$userHeaders = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: TechSpec Digest Energy Team <theo@theodisius.com>',
    'Reply-To: theo@theodisius.com',
    'X-Mailer: PHP/' . phpversion()
];

$userHtml = "
<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;'>
  <div style='background: #0284c7; padding: 24px; text-align: center; color: #ffffff;'>
    <h2 style='margin: 0; font-size: 20px;'>⚡ Home Battery Sizing Confirmation</h2>
    <p style='margin: 6px 0 0 0; color: #e0f2fe; font-size: 13px;'>Reference Number: <strong>{$leadId}</strong></p>
  </div>

  <div style='padding: 24px;'>
    <p style='font-size: 15px; line-height: 1.6;'>Hello <strong>{$fullName}</strong>,</p>
    <p style='font-size: 14px; line-height: 1.6; color: #475569;'>
      Thank you for using the TechSpec Digest Whole-Home Battery Storage Sizing Calculator. We have successfully logged your target blackout parameters for zip code <strong>{$zip}</strong>.
    </p>

    <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;'>
      <h4 style='margin: 0 0 10px 0; color: #0284c7; font-size: 14px; text-transform: uppercase;'>Your Calculated Backup Profile</h4>
      <ul style='margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #334155;'>
        <li><strong>Recommended Capacity:</strong> {$systemSizeKwh} kWh</li>
        <li><strong>Continuous Inverter Load:</strong> {$continuousKw} kW</li>
        <li><strong>Target Outage Duration:</strong> {$durationHours}</li>
        <li><strong>Estimated 30% Federal Tax Credit:</strong> {$taxCreditSavings}</li>
      </ul>
    </div>

    <p style='font-size: 14px; line-height: 1.6; color: #475569;'>
      A licensed, NABCEP-certified clean energy specialist serving the <strong>{$zip}</strong> area will review your electrical panel compatibility and prepare a direct quote including the 30% Section 25D federal clean energy tax credit deduction.
    </p>
    
    <p style='font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 24px;'>
      TechSpec Digest Energy Systems • <a href='https://digest.theodisius.com/' style='color: #0284c7;'>digest.theodisius.com</a>
    </p>
  </div>
</div>
";

@mail($email, $userSubject, $userHtml, implode("\r\n", $userHeaders));

// Return success response
echo json_encode([
    'success' => true,
    'leadId' => $leadId,
    'systemSizeKwh' => $systemSizeKwh,
    'zip' => $zip,
    'message' => 'Quote request registered successfully.'
]);
