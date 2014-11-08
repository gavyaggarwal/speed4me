$(document).ready(function() {

	$("#loginButton").click(function(event) {
		event.preventDefault;
		$(this).css("display","none");
		$("#loginBar").css("display","block");
	});

	$("#goButton").click(function(event){
		if (user.value != "")
		{
			console.log("Hi " + user.value + "!");
		}
			
	});

	

	

});

