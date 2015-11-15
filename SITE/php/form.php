<?php

	define ("MAIL", "tommycornilleau@gmail.com");

	if ($_SERVER["REQUEST_METHOD"] === "POST")
	{		

		if(isset($_GET['message'])) {
			$message = json_decode($_GET["message"]);

			$content='<html>';
			$content.='<body>';
			$content.='Quelqu\'un me contacte via le portfolio!<br /><br /><br />';
			$content.='Nom:<br />'.$message->name.'<br /><br />';
			$content.='Email:<br />'.$message->mail.'<br /><br />';
			$content.='Message:<br />'.$message->message;
			$content.='</body>';
			$content.='</html>';
			
			$headers ='From: "Contact Portfolio"<'.$message->mail.'>'."\n";
		    $headers .='MIME-Version: 1.0' . "\r\n"; 
		    $headers .='Content-type: text/html; charset=iso-8859-1' . "\r\n";
			
		    mail(MAIL, 'Contact Portfolio', $content, $headers);

		    echo 'done';
		}
	}
?>