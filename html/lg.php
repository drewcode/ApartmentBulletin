<?php
	extract($_POST);
	if($email=="admin@gmail.com" && $password=="12345")
	{
			echo "Succesfull@index.html";
	} 
	elseif($email=="user3@gmail.com" && $password=="33333")
	{
			echo "Succesfull@index.html";
	}
	else{
		echo "Failure";
	}
	
?>