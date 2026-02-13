<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Correo electrónico inválido.";
        exit;
    }

    $to = "gilsanforero13@gmail.com";

    $email_subject = "Nuevo mensaje de contacto: " . $subject;

    $email_body = "
    Has recibido un nuevo mensaje desde tu formulario web:

    Nombre: $name
    Correo: $email
    Asunto: $subject

    Mensaje:
    $message
    ";

    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "success";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje.";
    }
} else {
    http_response_code(403);
    echo "Acceso no permitido.";
}
