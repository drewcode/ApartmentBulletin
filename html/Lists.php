<?php
	$file=fopen("lists.txt","r");
	$filer="\0";
	if(filesize("lists.txt")){
		$filer=fread($file,filesize("lists.txt"));}
	fclose($file);
	echo $filer
?>
