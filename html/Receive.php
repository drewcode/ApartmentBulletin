<?php

$servername = "localhost";
$username = "root";
$password = "";

$conn = mysqli_connect($servername, $username, $password);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}
	
extract($_GET);
header('Content-Type:text/event-stream');
header('Cache-Control: no-cache');
$filename=$from."_log.txt";
ob_start();
$mod=0;
	clearstatcache();
	if(filemtime($filename)> $mod )
	{
		sleep(1);
		$fd=fopen($filename,'r');
		$data=fread($fd,filesize($filename));
		echo "event:Data\n";
		echo "data:$data\n\n";
		ob_flush();
		flush();
		fseek($fd,0,SEEK_SET);
		while(($msg=fgets($fd))!=null){
			$msg=explode(':',$msg);
			if($msg[0]==0){
				$temp=fopen($msg[1]."_log.txt",'w+');
				fwrite($temp,"1:".$from);
				fclose($temp);
				$sql = "UPDATE se_project.ChatApp SET status='1' WHERE SendBy='$msg[1]' AND SendTo='$from' AND status='0'";
				if (mysqli_query($conn, $sql)) {
					fclose($fd);
					$fd=fopen($filename,'w');
					$mod=filemtime($filename);
					sleep(1);
				} else {
					echo "Error updating record: " . mysqli_error($conn);
				}
			}
		}
}
sleep(1);
?>