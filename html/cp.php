<?php
	//echo "hello";
	extract($_POST);
	$myfile = fopen("../admin_only/comp.txt", "a") or die("Unable to open file!");
	$txt = $name.":".$desc;
	fwrite($myfile, $txt."\n");
	fclose($myfile);
?>