<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    $to = "email@email.pl"; // Adres e-mail docelowy
    $subject = "New Customer";
    $headers = "From: $email";

    $mailBody = "Name: $name\n";
    $mailBody .= "Email: $email\n";
    $mailBody .= "Phone: $phone\n";
    $mailBody .= "Message: $message\n";

    // Wysyłanie e-maila
    mail($to, $subject, $mailBody, $headers);
}
?>