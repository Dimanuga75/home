<?php
//$data = json_decode(file_get_contents("php://input"), true);
$to_emails = "grig1975@mail.ru, citystroitorg@mail.ru";
//echo "\n\n JSON array from POST:\n";
//print_r($data);
//die();

$nameClient = $_POST['name'];
$phone = $_POST["phone"];
$square = $_POST["square"];
$finishing = $_POST["finishing"];
$floor = $_POST["floor"];
$material = $_POST["material"];

//if (isset($_POST["dop"])) {
//   $dop = $_POST["dop"];
//   foreach ($dop as $item) echo "$item<br>";
//}
$ch  = stripslashes($_POST['dop']);
if (!empty($_POST['dop'])) {
   foreach ($_POST['dop'] as $check) {
      $ch .= $check . ' ';
   }
}
//$finishing = $_POST["finishing"];

//$nameClient = $data['form']['name'];
//$phone =  $data['form']['phone'];
//$square = $data['form']['square'];

$nameClient = htmlspecialchars($nameClient);
$phone = htmlspecialchars($phone);
$square = htmlspecialchars($square);
$finishing = htmlspecialchars($finishing);
$floor = htmlspecialchars($floor);
$material = htmlspecialchars($material);

$nameClient = urldecode($nameClient);
$phone = urldecode($phone);
$square = urldecode($square);
$finishing = urldecode($finishing);
$floor = urldecode($floor);
$material = urldecode($material);

$nameClient = trim($nameClient);
$phone = trim($phone);
$square = trim($square);
$finishing = trim($finishing);
$floor = trim($floor);
$material = trim($material);

$rezult = mail($to_emails, "Заявка с квиза по строительству ", "Имя:" . $nameClient  . "\nПлощадь: " . $square . "\nОтделка: " . $finishing . "\nЭтажей в доме: " . $floor . "\nКровля: " . $material . "\nДопы: " . $ch . "\nТелефон: " . $phone, "From: grig1975@mail.ru \r\n");
if ($rezult) {
   $message = "SUCCESS ";
} else {
   $message = "FAILED ";
}
$date = date('Y-m-d');
$token = "6730539204:AAFNYG0GlLXXhKWMI1qq1YP337D1jaQoHQg";
$chat_id = "-1001783219858";
$arr = array(
   'Заявка с квиза по домам' => '',
   'Имя: ' => $nameClient,
   'Площадь дома: ' => $square,
   'Отделка: ' => $finishing,
   'Этажей в доме: ' => $floor,
   'Кровля: ' => $material,
   'Допы: ' => $ch,
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
