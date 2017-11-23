xhr=new XMLHttpRequest();
		xhrMessage=new XMLHttpRequest();
		
		function Create(){
			if(xhr.readyState==4 && xhr.status==200){
				var ids=['u1','u2','u3'];
				Users=xhr.responseText.split("\n");
				j=0;
				for(var i=0;i<Users.length;i++){
					x=Users[i].split(":");
					if(x[0]!=from){
						document.getElementById(ids[j]).innerHTML=x[1];
						document.getElementById(ids[j]).id=x[0];
						j++;
					}
				}				
			}		
		}
		
		function UserList(){
			message=document.getElementById("chat-input");
			//Response=document.getElementById("Response");
			from=document.getElementsByTagName("body")[0].title;
			xhr.onreadystatechange=Create;
			xhr.open("GET","Lists.php",true);
			xhr.send();
			ev=new EventSource("Receive.php?from="+from);
			ev.addEventListener("Data",populate,true);
		}
		
$(function() {
  var INDEX = 0; 
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    var buttons = [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ];
    
    // #TODO - add a AJAX here, get the message
    //generate_message(recvd_msg, 'user'); 
    
  })
  
  function generate_message(msg, type) {
    INDEX++;
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"../images/sent.jpg\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  
  function generate_button_message(msg, buttons){    
    /* Buttons should be object array 
      [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ]
    */
    INDEX++;
    var btn_obj = buttons.map(function(button) {
       return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
    }).join('');
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";   
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);   
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    $("#chat-input").attr("disabled", true);
  }
  
  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(open_func, "")
  
  $(".chat-box-toggle").click(close_func)
  
})

function open_func(name) {
	var myNode = document.getElementById("chat-logs");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
	document.getElementById("chat-input").name=name;
	ChatHistory(name);
}

function ChatHistory(name){
			from=document.getElementsByTagName("body")[0].title;
			xhrDisplaying=new XMLHttpRequest()
			xhrDisplaying.onreadystatechange=Display;
			xhrDisplaying.open("GET","ChatHistory.php?frm="+from+"&to="+name,true);
			xhrDisplaying.send();		
		}

function Display(){
	if(xhrDisplaying.readyState==4 && xhrDisplaying.status==200){
		messages=xhrDisplaying.responseText.split("\n");
		for(var i=0;i<messages.length-1 && messages[i]!="";i++){
					x=messages[i].split(":");
					if(x[0]==from){
						generate_message(x[1],"self");
					}
					else{
						generate_message(x[1],"user");
					}
		}
	}
}

function close_func() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
}



function Send(){
			xhrsend=new XMLHttpRequest();
			xhrsend.onreadystatechange=Sending;
			xhrsend.open("POST","message.php",true);
			xhrsend.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhrsend.send(getString());
		}

		function getString(){
			var arr=new Array();
			to=message.name;
			msg=message.value;
			//Response.innerHTML=from+":"+msg+"                     	<span id=\"Sent\">Sent</span>"+"<br>"+Response.innerHTML;
			arr.push(encodeURIComponent("frm")+"="+encodeURIComponent(from));
			arr.push(encodeURIComponent("to")+"="+encodeURIComponent(to));
			arr.push(encodeURIComponent("msg")+"="+encodeURIComponent(msg));
			return arr.join('&');
		}

		function Sending(){
			if(xhr.readyState==4 && xhr.status==200){
				//msg Sent
			}	
		}
		
function populate(event)
		{	
			x=event.data.split("\n");
			for(i=0;i<x.length;i++){
				user=x[i].split(":");
				if(user[1]== message.name){
					switch(user[0]){
					case '0':Request(user[1]);break;
					}
				}
				else{
					if(user[0]==0){
						alert("Message from "+document.getElementById(user[1]).innerHTML);
					}
				}
			}	
		}
		
function Request(name){
		xhrMessage.onreadystatechange=Result;
		xhrMessage.open("GET","Get.php?frm="+from+"&to="+name,true);
		xhrMessage.send();
}
		
function Result(){
	if(xhrMessage.readyState==4 && xhrMessage.status==200){
			generate_message(xhrMessage.responseText.split(":")[1],"user");
	}
}
		
function generate_message(msg, type) {
    var str="";
    str += "<div id='cm-msg-2' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"../images/sent.jpg\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-2").hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }

// SIDEBAR



$("#admin").click(open_func)
$("#sec").click(open_func)

$("#u1").click(function(event) {
      return open_func(event.target.id);
});
$("#u2").click(function(event) {
      return open_func(event.target.id);
});
$("#u3").click(function(event) {
      return open_func(event.target.id);
});

$(document).click(function(event) {
      $("#name").html($(event.target).text());
});