<?php
	extract($_POST);
	$from=fopen("../admin_only/bills.txt","w");
	fwrite($from,$water.";".$power.";".$bb.";".$mm);
	fclose($from);
?>