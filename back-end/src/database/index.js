const mongoose = require('mongoose');

//mongodb connection
// mongodb+srv://root:<password>@cluster0.tishv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.tishv.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

 }
 ).then(() => {
     console.log("db connected")
 });



