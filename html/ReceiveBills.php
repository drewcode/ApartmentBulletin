<?php
header('Content-Type:text/event-stream');

ob_start();
		sleep(2);
		$f=fread(fopen("../admin_only/bills.txt","r"),filesize("../admin_only/bills.txt"));
		echo "Data:Bills\n";
		echo "data:$f\n\n";
		ob_flush();
		flush();

?>
