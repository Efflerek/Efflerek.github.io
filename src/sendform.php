<?php
error_log(print_r($_POST, true));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobierz dane z formularza
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $userMessage = $_POST['message']; // Zmieniłem nazwę zmiennej na userMessage

    // Adres docelowy
    $to = "support@easymotionskin.is"; // Zaktualizowano adres e-mail

    // Temat wiadomości
    $subject = "Formularz kontaktowy od $name";

    // Treść wiadomości
    $message = "Imię: $name\n";
    $message .= "Email: $email\n";
    $message .= "Telefon: $phone\n";
    $message .= "Wiadomość: $userMessage"; // Użyj zmiennej $userMessage

    // Nagłówki e-maila
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n";

    // Wyślij e-mail
    mail($to, $subject, $message, $headers);

    // Zwróć potwierdzenie sukcesu
    echo "Formularz został wysłany.";
} else {
    // Zabezpiecz przed bezpośrednim dostępem
    echo "Nieprawidłowe żądanie.";
}
?>
