const express  = require('express');

const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const {MONGOURI} = require('./keys');
//const bodyParser = require("body-parser"); 

const PORT = process.env.PORT || 5000

mongoose.connect(MONGOURI,{
    dbname:"insta_clone",
}).then(()=>console.log("Database connected"))
.catch((e)=>console.log(e));
  
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
//app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("server is running")
})

