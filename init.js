const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(() => {console.log("connection successful")})
      .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//created chat module and addin data
let allchats = [
   { from:"joe",
    to:"nan",
    msg:"joe loves dida",
    created_at: new Date()
   }, //this fun return random dates
   { from:"tushay",
    to:"joe",
    msg:"play with ball joe",
    created_at: new Date()
   },
   { from:"noonaa",
    to:"nan",
    msg:"lets play among us",
    created_at: new Date()
   },
   { from:"nan",
    to:"papa",
    msg:"feeling depressed",
    created_at: new Date()
   },
   { from:"mumma",
    to:"nan",
    msg:"everthing will be great chill!",
    created_at: new Date()
   },
];

Chat.insertMany(allchats); 
