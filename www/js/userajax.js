
const url = "http://localhost:8000/";
const user = "testadmin";
const pass = "test123";

function connectJson() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("Status: " + xhr.status);
            console.log(xhr.response);


            
        }
    }

    return xhr;
}

function getUserInfo() {
    let xhr = connectJson();

    xhr.open("GET", url+"json/get/user", true, user, pass);
    xhr.send();

    let user = JSON.parse(xhr.response);

    console.log(typeof(user));
    console.log(user["name"]);

    $("#userName").html(user["name"]);
}

getUserInfo();
