xhr=new XMLHttpRequest();
var timeout;
function updates(){
	xhr.abort();
	xhr.open("GET","updt.php",true);
	xhr.onreadystatechange=update;
	xhr.send(null);
	timeout=setTimeout(updates,10000);
}

function update(){
	
	if(xhr.readyState==4 && xhr.status==200){
		//alert("Hello");
		data=xhr.responseText;
		if(data!="\0"){
		div=document.createElement("div");
		document.getElementById("page-wrapper").appendChild(div);
		
		div.innerHTML="<div class=&quotrow&quot><div class=\"col-lg-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"> Topic</div> <div class=\"panel-body\"><table width=\"100%\" class=\"table\" id=\"dataTables-example\">Text</table> <div class=\"well\"><p>"+data+" </p></div></div></div></div></div>";
		}clearTimeout(timeout);
		updates();
	}
}