<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name2 = $_POST["name2"];
    $email2 = $_POST["email2"];
    $phone2 = $_POST["phone2"];
    $userMessage2 = $_POST["userMessage2"];
    $privacyPolicy2 = $_POST["privacy-policy2"];
    $recaptchaResponse = $_POST["recaptchaToken"]; // Zmieniłem to, aby używać jednego klucza reCAPTCHA dla obu formularzy

    if ($recaptchaResponse) {
        // Verify reCAPTCHA response using Google's reCAPTCHA API (https://developers.google.com/recaptcha)
        $recaptchaSecretKey = "6Lc56bcoAAAAAOcFwapxTrthsqj86QsAn3vtplxt"; // Klucz reCAPTCHA dla formularza form2
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
            $subject = "Form submission - footer";
            $message = "Name: $name2\nEmail: $email2\nPhone: $phone2\nMessage: $userMessage2\nPrivacy Policy Accepted: $privacyPolicy2";
            $headers = "From: $email2";

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