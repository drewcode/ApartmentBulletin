<?php	
	extract($_GET); //frm,to
	//get the database result
	//Update the database by 2
	$servername = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT SendBy,Message,status FROM se_project.ChatApp WHERE ((SendBy='$to' AND SendTo='$frm') OR (SendBy='$frm' AND SendTo='$to')) ORDER BY Time ASC";
	$result = mysqli_query($conn, $sql);
	$messages="";
	while($row = mysqli_fetch_assoc($result)) {
		$messages.=$row['SendBy'].":".$row['Message'].":".$row["status"]."\n";
	}
	$sql = "UPDATE se_project.ChatApp SET status='2' WHERE ((SendBy='$to' AND SendTo='$frm') OR (SendBy='$frm' AND SendTo='$to'))";
	if (mysqli_query($conn, $sql)) {
		$from=fopen($to."_log.txt","w+");
		fwrite($from,"2:".$frm);
		fclose($from);
	}
	mysqli_close($conn);
	echo $messages;
	$from=fopen($to."_log.txt","w+");
	fwrite($from,"2:".$frm);
	fclose($from);
	
?>