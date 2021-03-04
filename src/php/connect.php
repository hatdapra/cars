<?php
	header("Access-Control-Allow-Methods: OPTIONS, PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header("Access-Control-Allow-Origin: *");

	$servername = "dhsrv";
	$username = "admin";
	$password = "abcd1234";
	$dbname = "world";


try{
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->exec("SET CHARACTER SET  utf8");

	}
catch(PDOException $e) {
	echo "Error: " . $e->getMessage();
	} 

?>