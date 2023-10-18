<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $privacyPolicy = $_POST["privacy-policy"];
    $recaptchaResponse = $_POST["recaptchaResponse"];

    if ($recaptchaResponse) {
        // Verify reCAPTCHA response using Google's reCAPTCHA API (https://developers.google.com/recaptcha)
        $recaptchaSecretKey = "YOUR_SECRET_KEY"; // Replace with your actual secret key
        $recaptchaVerifyUrl = "https://www.google.com/recaptcha/api/siteverify";
        $data = [
            "secret" => $recaptchaSecretKey,
            "response" => $recaptchaResponse,
        ];

        $options = [
            "http" => [
                "method" => "POST",
                "header" => "Content-Type: application/x-www-form-urlencoded",
                "content" => http_build_query($data),
            ],
        ];

        $context = stream_context_create($options);
        $recaptchaResult = file_get_contents($recaptchaVerifyUrl, false, $context);
        $recaptchaResult = json_decode($recaptchaResult);

        if ($recaptchaResult->success) {
            // Send email with the form data
            $to = "support@easymotionskin.is";
            $subject = "New Form Submission";
            $message = "Name: $name\nEmail: $email\nPhone: $phone\nPrivacy Policy Accepted: $privacyPolicy";
            $headers = "From: $email";

            mail($to, $subject, $message, $headers);
            echo "Form submitted successfully.";
        } else {
            echo "reCAPTCHA verification failed.";
        }
    } else {
        echo "reCAPTCHA verification failed.";
    }
} else {
    echo "Invalid request.";
}
?>