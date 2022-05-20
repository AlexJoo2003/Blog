var socket = io();

// socket.on("event", function(value){});
// socket.emit("event", "value");

var url_string = window.location.href
var url = new URL(url_string);
var post_id = url.searchParams.get("id");


function CreatePost(postData){
    // var postList = document.querySelector(".postList");
    var post = document.createElement("div");
    post.className = "post";
    post.id = postData._id; // good job me from the past
    var top = document.createElement("div");
    top.className = "top";
    post.appendChild(top);
    var author = document.createElement("div");
    author.className = "author";
    top.appendChild(author);
    var authorPFP = document.createElement("img");
    authorPFP.src = "https://dummyimage.com/500x500/f8a669/000.png?text=PFP";
    author.appendChild(authorPFP);
    var authorName = document.createElement("span");
    authorName.className = "name";
    authorName.textContent = postData.author;
    author.appendChild(authorName);
    var title = document.createElement("div");
    title.className = "title";
    title.textContent = postData.title;
    top.appendChild(title);
    var content = document.createElement("div");
    content.className = "content";
    content.textContent = postData.content;
    post.appendChild(content);
    var controls = document.createElement("div");
    controls.className = "controls";
    controls.hidden = true;
    // var editBtn = document.createElement("button");
    // editBtn.className = "edit";
    // editBtn.textContent = "edit";
    // controls.appendChild(editBtn);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", function(){
        if (confirm("Do you want to delete this post?")){
            let id = document.querySelector(".post").id;
            socket.emit("deletePost", id);
            window.location.href = "index.html";
        }
    });
    controls.appendChild(deleteBtn);
    post.appendChild(controls);

    return post;
}

socket.emit("GivePostData", post_id);

socket.on("GetPostData", function(postData){
    let postList = document.querySelector(".postList");
    postList.insertBefore(CreatePost(postData), postList.firstChild);
});

document.querySelector("#login").addEventListener("click", function(){
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    if (username == document.querySelector(".author").textContent){
        socket.emit("logInCheck", [username, password]);
    }
    else{
        alert(`${username} doesn't own this post`);
    }

});
socket.on("logInResponse", function(result){
    if (result){
        document.querySelector(".controls").hidden = false;
        alert("login successfull");
    }
    else{
        document.querySelector(".controls").hidden = true;
        alert("login unsuccessfull");
    }
});