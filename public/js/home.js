function addResource() {
    var jsonData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        owner: sessionStorage.getItem("email"),
    };

    var messageElement = document.getElementById("message");

    if (jsonData.name === "" || jsonData.location === "" || jsonData.description === "") {
        messageElement.innerHTML = 'All fields are required!';
        messageElement.setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        var response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message === undefined) {
            messageElement.innerHTML = 'Added Resource: ' + jsonData.name + '!';
            messageElement.setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("location").value = "";
            document.getElementById("description").value = "";
            window.location.href = 'home.html';
        } else {
            messageElement.innerHTML = 'Unable to add resource!';
            messageElement.setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}