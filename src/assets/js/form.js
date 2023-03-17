// function submitForm(event) {
// 	event.preventDefault(); // prevent the form from submitting normally
// 	var form = document.getElementById("cs-form");
// 	var data = new FormData(form);
// 	var xhr = new XMLHttpRequest();
// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState === XMLHttpRequest.DONE) {
// 			if (xhr.status === 200) {
// 				alert("Message sent successfully!");
// 				form.reset();
// 			} else {
// 				alert("Error: " + xhr.statusText);
// 			}   
// 		}
// 	};
// 	xhr.open("POST", "/send-email");
// 	xhr.send(data);
// }

// var form = document.getElementById("cs-form");
// form.addEventListener("submit", submitForm);