<?php
// Подключаем файлы phpmailer
require './phpmailer/PHPMailer.php';
require './phpmailer/SMTP';
require './phpmailer/Exception.php';

// Записываем в переменную тему письма
$title = 'Тема письма';
// $file = $_FILES['file']; // Сюда записываются все файлы прикрепленные к сообщению

// Формируем само письмо
$title = 'Заголовок пиьсма';
foreach ( $_POST as $key => $value ) {
  if ( $value != '' && $key != 'project_name' && $key != 'admin_email' && $key != 'form_subject' ) {
    $body .= "
      " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
        <td style='padding: 10px; border: #e9e9e9 1px solid'><b>$key</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid'><b>$value</b></td>
      '</tr>'
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройка PHPMAiler
$mail = new PHPMailer/PHPMailer/PHPMailer();

try {
  // Используем SMTP
  $mail->isSMTP();
  // Используем кодировку UTF-8
  $mail->CharSet = 'UTF-8';
  // Используем авторизайчю по SMTP
  $mail->SMTPAuth = true;

  // Настройки почты
  $mail->Host = 'smtp.gmail.com';             // SMTP сервер почты
  $mail->Username = 'testlayout74@gmail.com'; // Логин на почте
  $mail->Password = 'buajcdztrtulgbit';       // Пароль на почте M4vei2p55
  $mail->port = 465;

  $mail->setForm('testlayout74@gmail.com', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатели письма
  $mail->addAddress('vosin89@gmail.com');
  $mail->addAddress('vosin89@mail.ru');

  // Отправка сообещния
  $mail->isHTML(true);                        // Преобразовываем письмо в HTML
  $mail->Subject = $title;                    // Ставим тему письма
  $mail->Body = $body;                        // Наполнение письма это body

  // Отправляем пиьсмо
  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение небыло отправлено. Причина ошибки: {$mail->ErrorInfo}";
}


// $mail = PHPMailer/PHPMailer/PHPMailer();
// $mail->CharSet = 'utf-8';

// $name = $_POST['name'];
// $phone = $_POST['tel'];

// $mail->SMTPDebug = 3;

// $mail->isSMTP();
// $mail->Host = 'smtp.gmail.com';
// $mail->SMTPAuth = true;
// $mail->Username = 'testlayout74@gmail.com';
// $mail->Password = 'M4vei2p55';

// $mail->SMTPSecure = 'ssl';
// $mail->Port = 465;

// $mail->setForm('testlayout74@gmail.com', 'Художественная галерея Blanchard');
// $mail->addAddress('testlayout74@gmail.com');
// $mail->addAddress('vosin89@gmail.com');

// $mail->isHTML(true);

// $mail->Subject = 'Заявка с тестового сайта';
// $mail->Body    = 'Пользователь <b>' .$name . '</b> оставил заявку. <br> Его номер телефона <b>' .$phone '</b>';
// $mail->AltBody = '';

// if (!$amil->send()) {
//   echo 'Error';
// } else {
//   echo 'Ok';
// }
?>
