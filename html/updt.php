<?php
	$file=fopen("updates.txt","r");
	$filer="\0";
	if(filesize("updates.txt")){
		$filer=fread($file,filesize("updates.txt"));
		$filew=fopen("updates.txt",'w+');
		fclose($filew);
	}
	fclose($file);
	echo $filer;
?>
