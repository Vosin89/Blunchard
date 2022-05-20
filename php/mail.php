<?php
require_once 'PHPMailer-master/src/PHPMailer.php';

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$phone = $_POST['tel'];

$mail->SMTPDebug = 3;

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'testlayout74@gmail.com';
$mail->Password = '313233eqeweeEE11';

$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setForm('testlayout74@gmail.com', 'Художественная галерея Blanchard');
$mail->addAddress('testlayout74@gmail.com');
$mail->addAddress('vosin89@gmail.com');

$mail->isHTML(true);

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = 'Пользователь <b>' .$name . '</b> оставил заявку. <br> Его номер телефона <b>' .$phone '</b>';
$mail->AltBody = '';

if (!$amil->send()) {
  echo 'Error'ж
} else {
  echo 'Ok';
}


// $admin_email = array();
// foreach ( $_POST[admin_email] as $key => $value ) {
//   array_push($admin_email, $value);
// }

// $admin_email = 'testlayout74@gmail.com';

// $form_subject = trim($_POST("form_subject"));

// $mail = new PHPMailer;
// $mail->CharSet = 'UTF-8';


// $c = true;
// $massage = '';
// foreach( $_POST as $key => value ) {
//   if ( $value != "" && $key != "admin_email" && $key != "form_subject") {
//     if ( is_array($value) ) {
//       $val_text = '';
//       foreach ($value as $val) {
//         if ($val && $val != ) {
//           $val_text .= ($val_text==''?'':', ').val;
//         }
//       }
//       $value = $val_text;
//     }
//     $massage = "
//     " . ( ($c = !$c) ? '<tr>':'</tr>' ) . "
//     <td style='padding: 10px;width: auto;'></b>$key:</b></td>
//     <td style='padding: 10px;width: 100%;'>$value</td>
//     ";
//   }
// }
// $massage = "<table style='width: 50%;'>$massege</table>"

// // От кого
// $mail->setForm('adm@' - $_SERVER['HTTP_HOST'], 'You best site');

// // Кому
// foreach ( $admin_email as $key => $value ) {
//   $mail->addAddress($value);
// }

// // Тема письма
// $mail->Subject = $form_subject;
// // $mail->isHTML(true); это прям если верстка
// $mail->msgHTML($body);

// $mail->send();
?>
