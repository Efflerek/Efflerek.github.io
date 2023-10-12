<?php
error_log(print_r($_POST, true));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pobierz dane z formularza (zmień nazwy pól, jeśli to konieczne)
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // Adres docelowy
    $to = "support@easymotionskin.is"; // Zaktualizowano adres e-mail

    // Temat wiadomości
    $subject = "Formularz konsultacyjny od $name";

    // Treść wiadomości
    $message = "Imię: $name\n";
    $message .= "Email: $email\n";
    $message .= "Telefon: $phone";

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