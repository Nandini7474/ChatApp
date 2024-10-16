const express = require("express");
const app= express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");

app.set("views" , path.join(__dirname, "views"));
app.set("view engine", "ejs");//template connections
app.set(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));
app.use(express.static('public'));

main().then(() => {console.log("connection successful")})
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//created chat module and addin data
// let chat1 = new Chat({
//     from:"joe",
//     to:"nan",
//     msg:"joe loves dida",
//     created_at: new Date(), //this fun return random dates

// });

// chat1.save().then((res) => {
//     console.log(res);
// });


app.use(express.urlencoded({extended: true}));  //so that if we get data as a url it will auto convert
// app.use(express.json());

//Index route
app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats}); // render will return the data in temlate htmls
});


//NEW ROUTE TO CREATE NEW CHAT
app.get("/chats/new", (req,res) =>{
    res.render("new.ejs")
});
//res will be stored in this route
app.post("/chats", (req,res) => {
    let{ from, to ,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    console.log(newChat);
    newChat.save()
    .then(() => {console.log("chat was saved");
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit",async(req,res) => {
    let { id } = req.params;
    let chat = await  Chat.findById(id);
    res.render("edit.ejs" ,{chat});

});

//UPdate route
app.put("/chats/:id" , async (req,res) => {
    let { id } = req.params;
    let { msg : newMsg } =req.body;
    let UpdatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    );
    console.log(UpdatedChat);
    res.redirect("/chats");
});


//DESTROY 
app.delete("/chats/:id", async (req,res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});


//FIRST INITALISATION
app.get("/", (req,res) =>{
    res.send("root is working");
    
});

app.listen(port, () =>{
    console.log(`listening to port ${ port }`)
});