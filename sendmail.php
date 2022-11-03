<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php'; // подключение плагина скаченного из папки
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true); // объявляем плагин
	$mail->CharSet = 'UTF-8'; //кодировка
	$mail->setLanguage('ru', 'phpmailer/language/'); //язык
	$mail->IsHTML(true); //вкл возможность html тегов в письме

	//От кого письмо
	$mail->setFrom('указать!', 'Фрилансер по жизни');
	//Кому отправить
	$mail->addAddress('a4ypaxoid@yandex.ru');
	//Тема письма
	$mail->Subject = 'Привет! Пишу тебе с твоего сайта';

	//Рука
	$hand = "Правая";
	if($_POST['hand'] == "left"){
		$hand = "Левая";
	}

	//Тело письма
	$body = '<h1>Встречайте супер письмо!</h1>';
	//проверки на пустоту поля
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	
	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}
	
	/*Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	} 
	$mail->Body = $body; */


	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>