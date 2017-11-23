<?php

	header('Content-Type:text/event-stream');

	ob_start();
	$mod=filemtime("../admin_only/updates.txt");
	while(true)
	{	
		clearstatcache();
		if(filemtime("../admin_only/updates.txt")> $mod )
		{
			$f=file("../admin_only/updates.txt");
			$d=$f[sizeof($f)-1];
			echo "event:Data\n";
			echo "data:{$d}\n\n";
			ob_flush();
			flush();
			$mod=filemtime("../admin_only/updates.txt");
		}
		sleep(2);
		//clearstatcache();
	}
?>