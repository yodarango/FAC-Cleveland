
//native npms
const path = require('path');

//third party npms
const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs');

//my npm
const controllers = require('./controllers/controllers');

//middleware
const app = express();
app.use(controllers);
const viewPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

//file paths configureations 
const publicPathDir = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;


//set up the static direcctory 
app.use(express.static(publicPathDir));

//===========================IF EMAILS DONT WORK UNCOMMENT THIS==============
///app.use(express.urlencoded({extended: false}));

//views configuration
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


//connect to the dbs 
const uri = process.env.URI
mongoose.connect('mongodb+srv://tetsUser:Yodarango2*@cluster0.v5jxm.mongodb.net/facc?retryWrites=true&w=majority&ssl=true', 
{
useNewUrlParser: true, 
useUnifiedTopology: true
}).then(()=>
{
console.log('connected to db')
}).catch((error)=> console.log(error))

//listen to the app
app.listen(PORT, (error)=>
{
console.log(`You are connected on ${PORT}`)
if(error)
{
    console.log(error)
}
})