<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['MAIL_HOST'];
$user = $_ENV['MAIL_USERNAME'];
$pass = $_ENV['MAIL_PASSWORD'];
$port = $_ENV['MAIL_PORT'];

echo $host;


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Correo inválido";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $_ENV['MAIL_HOST'];
        $mail->Username   = $_ENV['MAIL_USERNAME'];
        $mail->Password   = $_ENV['MAIL_PASSWORD'];
        $mail->Port       = $_ENV['MAIL_PORT'];

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom($_ENV['MAIL_USERNAME'], 'Formulario Web');

        $mail->addAddress($_ENV['MAIL_USERNAME'], 'Allianz Website');

        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje: " . $subject;

        $mail->Body = "
            <h2>Nuevo mensaje desde tu sitio web</h2>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Asunto:</strong> {$subject}</p>
            <p><strong>Mensaje:</strong><br>{$message}</p>
        ";

        $mail->AltBody = "Nuevo mensaje\n\nNombre: $name\nEmail: $email\nAsunto: $subject\nMensaje: $message";

        $mail->send();

        echo "success";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Error al enviar: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "Acceso no permitido";
}
