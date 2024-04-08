<?php
$data = json_decode(file_get_contents("php://input"), true);
$to_emails = "grig1975@mail.ru, citystroitorg@mail.ru";
//echo "\n\n JSON array from POST:\n";
//print_r($data);
//die();

//$nameClient = $_POST['name'];
//$phone = $_POST["phone"];
$nameClient = $data['form']['name'];
$phone =  $data['form']['phone'];

$nameClient = htmlspecialchars($nameClient);
$phone = htmlspecialchars($phone);

$nameClient = urldecode($nameClient);
$phone = urldecode($phone);

$nameClient = trim($nameClient);
$phone = trim($phone);

$rezult = mail($to_emails, "Заявка с сайта", "Имя:" . $nameClient . ". Телефон: " . $phone, "From: grig1975@mail.ru \r\n");
if ($rezult) {
   $message = "SUCCESS ";
} else {
   $message = "FAILED ";
}
$date = date('Y-m-d');
$token = "6730539204:AAFNYG0GlLXXhKWMI1qq1YP337D1jaQoHQg";
$chat_id = "-1001783219858";
$arr = array(
   'Заявка с сайта по домам' => '',
   'Имя: ' => $nameClient,
   'Телефон для связи: ' => $phone
);

foreach ($arr as $key => $value) {
   $txt .= "<b>" . $key . "</b> " . $value . "%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

$true = $sendToTelegram;
//if ($true) {
//   $message =  $message . "SUCCESS";
//} else {
//   $message =  $message . "FAILED";
//}

$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);
echo $data_json;

//$link = new mysqli("127.0.0.1:3306", "root", "", "my_client");
//$link->query("INSERT INTO clients(  nameClient,phone, date) VALUES ( \"$nameClient\",\"$phone\", '$date')");
//$link = new mysqli("localhost", "citystol_str", "klipSD5", "citystol_str");
//$link->query("INSERT INTO str_client (phone, nameClient, date_current) VALUES (\"$phone\", \"$nameClient\", '$date')");

//if ($link->connect_error) {
//   $message =   die('Connect Error (' . $link->connect_errno . ') ' . $link->connect_error);;
//} else {
//   $message =  "SUCCESS";
//}
//echo  $message;
//$link->close();
