var socket = io();

// socket.on("event", function(value){});
// socket.emit("event", "value");

function sendPostToServer(post){
    console.log("Sending to the server");
    socket.emit("newPostCreated", post);
}
function getPostData(){
    console.log("Getting the data");
    let title = document.querySelector("#title").value;
    let content = document.querySelector("#content").value;
    let author = "Author" + Math.floor(Math.random()*10); // Get from login
    let pfp = "https://dummyimage.com/500x500/f8a669/000.png?text=PFP"; // Get from login
    let date = Date.now();

    return {
        "title": title,
        "content": content,
        "author": author,
        "pfp": pfp,
        "date-created": date
    }
}

document.querySelector("#upload-button").addEventListener("click", function(){
    sendPostToServer(getPostData());
    window.location.href = "index.html";
});
