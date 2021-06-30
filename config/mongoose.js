const mongoose = require("mongoose");
const db = "mongodb://localhost/jwt";
// const db = "mongodb+srv://user:t@VtV9MM88aPg$w@cluster0.0hz0d.mongodb.net/db?retryWrites=true&w=majority";

// mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(res => console.log("connected to db.."))
    .catch(err => console.log("err db"))
    