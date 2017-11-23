<?php
header('Content-Type:text/event-stream');
set_time_limit(0);
ob_start();
$f=fopen("comp.txt","r");
while (($line = fgets($f)) !== false) {
			$d=$line;
			//echo $line;
			//$da=split(":",$d);
			//$d=fgets($f);
			echo "event:Data\n";
			echo "data:{$d}\n\n";
			ob_flush();
			flush();
    }



$mod=filemtime("comp.txt");
while(true)
{	
	clearstatcache();
	if(filemtime("comp.txt")> $mod )
	{
		$f=file("comp.txt");
		//while(!foef($f))
		//{
			$d=$f[sizeof($f)-1];
			//$da=split(":",$d);
			//$d=fgets($f);
			echo "event:Data\n";
			echo "data:{$d}\n\n";
			ob_flush();
			flush();
			
		//}
		$mod=filemtime("comp.txt");
		//sleep(1);
		//$count+=1;
	}
	sleep(2);
	//clearstatcache();
}
?>