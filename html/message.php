<?php
	$servername = "localhost";
	$username = "root";
	$password = "";

// Create connection
	$conn = mysqli_connect($servername, $username, $password);

// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	extract($_POST);//frm,to,msg
	$t=time();
	//update DB to 0
	$sql = "INSERT INTO se_project.ChatApp (Time,SendBy,SendTo,Message,status) VALUES ('$t', '$frm', '$to','$msg','0')";

	if (mysqli_query($conn, $sql)) {
		$from=fopen($to."_log.txt","w+");
		fwrite($from,"0:".$frm);
		fclose($from);
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
mysqli_close($conn);
?>