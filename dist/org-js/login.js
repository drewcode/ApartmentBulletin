
function foo()
{
	xhr=new XMLHttpRequest();
	xhr.open("POST","lg.php",true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.onreadystatechange=update;
	data=getData();
	//alert(data);
	xhr.send(data);
}
function calling()
{
	document.getElementById('id01').style.display='block'
}
function getData(){
	var arr=new Array();
	email=document.getElementById("em").value;
	arr.push(encodeURIComponent("email")+"="+email);
	password=document.getElementById("ps").value;
	arr.push(encodeURIComponent("password")+"="+password);
	return arr.join('&');
}

function update(){
		if (xhr.readyState==4 && (xhr.status==200)){
				
				data=xhr.responseText.split("@")
				if(data[0]=="Succesfull")
				{
					window.location = data[1];
				}
				else
				{
					document.getElementById("id02").style.display='block';
				}
				
			}
	}
	
function Done2(){
	document.getElementById('id02').style.display='none';
}
function Done(){
	document.getElementById('id01').style.display='none';
	alert("Pssword Succesfully sent to email")
}