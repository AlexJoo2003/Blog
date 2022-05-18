var socket = io();

var username = document.querySelector("#username");
var password = document.querySelector("#password");
var signin = document.querySelector("#signin");


function getInfo(){
    let user = username.value;
    let pass = password.value;
    let date = Date.now();
    if (user.length === 0 || pass.length === 0){
        return 0;
    }
    else{
        return [user, pass, date];
    }
}


socket.on("UsernameOriginality", function(result){
    if (!result){
        let pass = password.value;
        if (pass){
            socket.emit("createNewUser", [username.value, pass]);
        }
    }
    else{
        alert("username already in use");
    }
});

socket.on("createdAUser", function(){
    alert("User account created successfully");
    window.location.href = "index.html";
});

signin.addEventListener("click", function(e){
    let user = getInfo()[0];
    if (user){
        socket.emit("checkUsername", user);
    }
});
