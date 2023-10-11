<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $to = "support@easymotionskin.is"; // Change this to your email address
    $subject = "New Customer";
    $headers = "From: $email";

    $mailBody = "Name: $name\n";
    $mailBody .= "Email: $email\n";
    $mailBody .= "Phone: $phone\n";

    // Wysyłanie e-maila
    if (mail($to, $subject, $mailBody, $headers)) {
        // Po wysłaniu formularza ukryj formularz i pokaż komunikat
        echo '<script>document.getElementById("confirmation-message").style.display = "block";</script>';
    }
}
?>
