<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $to = "email@email.pl"; // Change this to your email address
    $subject = "New Consultation Request";
    $message = "Name: $name\nEmail: $email\nPhone: $phone";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for your consultation request! We will be in touch.";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>