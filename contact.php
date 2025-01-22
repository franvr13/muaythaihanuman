<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar y validar los datos
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $number = filter_var(trim($_POST['number']), FILTER_SANITIZE_STRING);
    $subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

    // Validar el correo electrónico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Correo electrónico no válido.";
        exit;
    }

    // Validar que los campos no estén vacíos
    if (empty($name) || empty($email) || empty($number) || empty($subject) || empty($message)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    $to = "muaythaihanuman@gmail.com";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n";

    $body = "Nombre: $name\nNúmero: $number\n\nMensaje:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        // Redirigir a Formspree si el correo se envió con éxito
        header("Location:https://formspree.io/f/movjazql");
        exit;
    } else {
        echo "Error al enviar el mensaje.";
    }
}
?>