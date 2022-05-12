var socket = io();

// socket.on("event", function(value){});
// socket.emit("event", "value");

var AllPosts = [];

//TODO: Recieve all the Posts

socket.emit("GiveAllPosts");
console.log("Requesting server for posts");

socket.on("SendAllPosts", function(value){
    console.log("Recieved all Posts from server: ");
    AllPosts = value;
    DisplayAllPosts();
});


//TODO: Display all the Posts

function CreatePost(postData){
    // var postList = document.querySelector(".postList");
    var post = document.createElement("div");
    post.className = "post";
    post.id = postData._id;
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
    return post;
}

function DisplayAllPosts(){
    var postList = document.querySelector(".postList");
    AllPosts.forEach(postData => {
        console.log("Creating a post");
        postList.appendChild(CreatePost(postData));
    });
}

document.querySelector(".createPost").addEventListener("click", function(){
    window.location.href = "../PostEditor.html";
});