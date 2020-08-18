<?php
	$data = $_POST;
	$name = $data['name'];
	$phone = $data['phone'];
	$email = $data['email'];
	$qw1 = $data['qw1'];
	$qw2 = $data['qw2'];
	$qw3 = $data['qw3'];
	$qw4 = $data['qw4'];
	$qw5 = $data['qw5'];
	$qw6 = $data['qw6'];
	$qw7 = $data['qw7'];
	$summ = $data['summ'];

	$to  = "<reklama7d@yandex.ru>" ;

	$subject = "Расчитать стоимость";

	$message = "Сообщение от ".$name.".\r\n 
	Расчитать стоимость и связаться по номеру: ".$phone."\r\n 
	Почта: ".$email." \r\n
	Ответы: \r\n
	Объект ремонта: ".$qw1."\r\n 
	Стиль ремонта: ".$qw2."\r\n 
	Площадь помещения: ".$qw3."\r\n 
	Есть ли дизайн проект: ".$qw4."\r\n 
	Нахождение объекта: ".$qw5."\r\n 
	Нужнали помощь с закупкой стройматериалов?: ".$qw6."\r\n 
	Начало ремонта: ".$qw7."\r\n
	Предварительная сумма: ".$summ."\r\n";

	$headers .= "From: ".$name." <Kwis>\r\n";
	$headers .= "Reply-To: reply-to@example.com\r\n"; 

	if (mail($to, $subject, $message, $headers))
		echo 1;
	else
		echo 0;
?>