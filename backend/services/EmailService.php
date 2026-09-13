<?php

require_once __DIR__ . "/../config/env.php";

use Brevo\TransactionalEmails\Requests\SendTransacEmailRequest;
use Brevo\TransactionalEmails\Types\SendTransacEmailRequestSender;
use Brevo\TransactionalEmails\Types\SendTransacEmailRequestToItem;
use Brevo\Brevo;

class EmailService
{
    private Brevo $client;

    public function __construct()
    {
        $this->client = new Brevo(
            apiKey: $_ENV["BREVO_API_KEY"]
        );
    }

    public function sendVerificationEmail(
        string $name,
        string $email,
        string $token,
        bool $isResend = false
    ): void
    {
        $verificationLink = "http://localhost:5173/verify-email?token=" . urlencode($token);

            $emailHeading = $isResend
    ? "Your new verification link is here, {$name}."
    : "Welcome to DineEase, {$name}.";
    $emailIntro = $isResend
    ? "We've received a request to send you another verification email."
    : "Your dining journey starts here.";
      $emailBody = $isResend
    ? "We've received a request to send you another verification email. Your previous verification link is no longer needed. Click the button below to verify your email address and continue with DineEase."
    : "We've created your DineEase account. Before you can start discovering restaurants, reserving tables and ordering meals, you'll need to verify your email address.";
        $request = new SendTransacEmailRequest([
          "subject" => $isResend
    ? "Your new DineEase verification link"
    : "Verify your DineEase email",
            "htmlContent" => "
<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <meta name=\"color-scheme\" content=\"light\">
    <title>Verify your DineEase email</title>
</head>

<body style=\"
    margin:0;
    padding:0;
    background-color:#fffaf2;
    font-family:Arial, Helvetica, sans-serif;
    color:#171717;
\">

    <div style=\"
        width:100%;
        background-color:#fffaf2;
        padding:48px 20px;
        box-sizing:border-box;
    \">

        <div style=\"
            max-width:600px;
            margin:0 auto;
        \">

            <!-- Brand -->
            <div style=\"
                text-align:center;
                margin-bottom:32px;
            \">
                <div style=\"
                    font-family:Georgia, 'Times New Roman', serif;
                    font-size:28px;
                    font-weight:600;
                    letter-spacing:-0.5px;
                \">
                    <span style=\"color:#171717;\">Dine</span><span style=\"color:#dc2626;\">Ease</span>
                </div>
            </div>

            <!-- Email Card -->
            <div style=\"
                background-color:#ffffff;
                border:1px solid #eee9df;
                padding:48px 44px;
                box-sizing:border-box;
            \">

                <div style=\"
                    font-family:Georgia, 'Times New Roman', serif;
                    font-size:38px;
                    line-height:1.15;
                    font-weight:500;
                    letter-spacing:-1px;
                    color:#171717;
                    margin-bottom:20px;
                \">
                    {$emailHeading}
                </div>

                <div style=\"
                    font-size:17px;
                    line-height:1.7;
                    color:#555555;
                    margin-bottom:28px;
                \">
                   {$emailIntro}
                </div>

                <div style=\"
                    font-size:15px;
                    line-height:1.8;
                    color:#555555;
                    margin-bottom:32px;
                \">
                    {$emailBody}
                </div>

                <!-- CTA -->
                <div style=\"
                    margin-bottom:30px;
                \">
                    <a href=\"{$verificationLink}\" style=\"
                        display:inline-block;
                        background-color:#dc2626;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        font-weight:700;
                        letter-spacing:0.2px;
                        padding:16px 28px;
                    \">
                        Verify my email
                    </a>
                </div>

                <div style=\"
                    border-top:1px solid #eee9df;
                    padding-top:24px;
                    font-size:13px;
                    line-height:1.7;
                    color:#777777;
                \">
                    This verification link expires in
                    <strong style=\"color:#333333;\">1 hour</strong>.
                </div>

            </div>

            <!-- Security Note -->
            <div style=\"
                padding:28px 12px 0;
                font-size:13px;
                line-height:1.7;
                color:#777777;
                text-align:center;
            \">
                Didn't request this account?<br>
                You can safely ignore this email.
            </div>

            <!-- Fallback -->
            <div style=\"
                padding:24px 12px 0;
                font-size:12px;
                line-height:1.7;
                color:#999999;
                text-align:center;
            \">
                If the button doesn't work, copy and paste this link into
                your browser:
                <br><br>
                <span style=\"
                    color:#777777;
                    word-break:break-all;
                \">
                    {$verificationLink}
                </span>
            </div>

            <!-- Footer -->
            <div style=\"
                padding-top:36px;
                text-align:center;
                font-size:11px;
                color:#aaaaaa;
                letter-spacing:0.3px;
            \">
                © <span style=\"color:#171717;\">Dine</span><span style=\"color:#dc2626;\">Ease</span>
            </div>

        </div>

    </div>

</body>
</html>
",
            "sender" => new SendTransacEmailRequestSender([
                "name" => "DineEase",
                "email" => "slightlybetter204@gmail.com"
            ]),
            "to" => [
                new SendTransacEmailRequestToItem([
                    "email" => $email,
                    "name" => $name
                ])
            ]
        ]);

        $this->client->transactionalEmails->sendTransacEmail($request);
    }
}