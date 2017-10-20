<?php
	extract($_POST);
	if($email=="admin@gmail.com" && $password=="12345")
	{
			echo "Succesfull@index.html";
	}
	else{
		echo "Failure";
	}
	
?>