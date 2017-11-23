<?php
	extract($_GET);//frm,to
	//Fetch result from DB frm,to,status=0
	//Update result status=2
	$servername = "localhost";
	$username = "root";
	$password = "";

// Create connection
	$conn = mysqli_connect($servername, $username, $password);

// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	
	$sql = "SELECT Message FROM se_project.ChatApp WHERE SendBy='$to' AND SendTo='$frm' AND status='1'";
	$result = mysqli_query($conn, $sql);
	$messages="";
	while($row = mysqli_fetch_assoc($result)) {
		$messages.=$to.":".$row['Message']."<br>";
	}
	$sql = "UPDATE se_project.ChatApp SET status='2' WHERE SendBy='$to' AND SendTo='$frm' AND status='1'";
	if (mysqli_query($conn, $sql)) {
		$from=fopen($to."_log.txt","w+");
		fwrite($from,"2:".$frm);
		fclose($from);
	}
	mysqli_close($conn);
	echo $messages;
?>
