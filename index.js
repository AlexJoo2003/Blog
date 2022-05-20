const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { MongoClient, ObjectId } = require("mongodb");
const config = require("./config.js");
const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const uri = config;
const client = new MongoClient(uri);
const posts = client.db("ForumDB").collection("posts");
const users = client.db("ForumDB").collection("users");


app.use(express.static("page"));

server.listen(3000, () => {
    console.log('listening on *:3000');
});

async function run() {
    try {
        await client.connect();
    }
    catch(e){
        console.log(e);
    }
}
run().catch(console.dir);

io.on("connection", (socket) => { // User connected
    console.log("A user connected");
    socket.on("disconnect", () =>{
        console.log("A user disconnected");
    });

    socket.on("GiveAllPosts", async() => { // User joined
        console.log("User joined");
        try{
            let result = await posts.find().sort({"date-created":-1}).toArray();
            socket.emit("SendAllPosts", result);
            console.log("Sending all posts to a user");
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on("newPostCreated", async(post)=>{  // WHen a user created a new post
        console.log("new post recieved from a client", post);
        try{
            let result = await posts.insertOne(post);
            console.log("Added a post to the database", result);
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on("logInCheck", async(data)=>{  //Check if the username and password are correct for the log in
        console.log("Checking username and password of ", data[0]);
        try {
            let result = await users.findOne({"username": data[0]});
            io.emit("logInResponse", Boolean(result && result.password == data[1]));
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on("checkUsername", async(username)=>{   // check if the username already exists in the database
        console.log("Checking originality of username: " + username);
        try {
            let result = await users.findOne({"username": username});
            io.emit("UsernameOriginality", Boolean(result));
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on("createNewUser", async(data)=>{   // Create a new user
        console.log("creating new user: ", data[0]);
        try{
            let result = await users.insertOne({"username": data[0], "password": data[1]});
            io.emit("createdAUser");
        }
        catch(e){
            console.log(e);
        }
    });

    socket.on("GivePostData", async(id)=>{  // Send post data to the post.html
        console.log("Client requesting post with id: ", id);
        try{
            let o_id = new ObjectId(id);
            let result = await posts.findOne({"_id": o_id});
            io.emit("GetPostData", result);
        }
        catch(e){
            console.log(e);
        }
    });
    
    socket.on("deletePost", async(id)=>{    // Delete the post
        console.log("deleting post with id: ", id);
        try{
            let o_id = new ObjectId(id);
            let result = await posts.deleteOne({"_id": o_id});
        }
        catch(e){
            console.log(e);
        }
    });
});
