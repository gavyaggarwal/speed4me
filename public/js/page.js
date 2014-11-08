$(document).ready(function() {

	$("#loginButton").click(function(event) {
		event.preventDefault;

		$(this).css("display","none");
		$("#loginBar").css("display","block");
	});

	$("#goButton").click(function(event){
		if (user.value != "") {
			console.log("Hi " + user.value + "!");

			$.ajax({
				url: "/api/getDrops",
				type: "POST",
				// dataType: "json",
				data: {
					username: $("#user").val()
				},
				// contentType: "application/json"
			}).done(function() {
				console.log("AJAX CALL SUCCESS?");
			});
		}
			
	});

	$("#newModalButton").click(function(event){
		console.log("If you don't see this you should be pretty sad.");
		$('#myModal').modal('show')
	});
});

