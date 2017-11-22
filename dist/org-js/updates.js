function init()
{
	ev=new EventSource("updt.php");
	ev.addEventListener("Data",populate,true);
	
}

function populate(event)
{	
	//id=document.getElementById("dataTables-example");
	//id.innerHTML+="FRIEND : "+event.data+"<br/>";
	if(event.data!="\0")
	{
		div=document.createElement("div");
		document.getElementById("page-wrapper").appendChild(div);
		
		d = event.data.split("-")
		var topic = d[0]
		var time = d[1]
		var text = d[2]
		div.innerHTML="<div class=&quotrow&quot><div class=\"col-lg-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\">" + topic + "</div> <div class=\"panel-body\"><table width=\"100%\" class=\"table\" id=\"dataTables-example\">" + time + "</table> <div class=\"well\"><p>" + text + " </p></div></div></div></div></div>";
	}
	
}