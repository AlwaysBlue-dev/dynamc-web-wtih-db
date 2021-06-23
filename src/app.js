const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/userMessage")
const app = express();
const hbs = require("hbs")
const port = process.env.PORT || 3000;

//---setting the paths---
//console.log(path.join(__dirname, "../public"))
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//---middleware---
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))); //for css
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))); //for javascript
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist"))); //for jquery
app.use(express.static(staticPath)); //use public folder
app.use(express.urlencoded({extended:false})); //for getting json data

//---setting view engine---
app.set("view engine", "hbs"); 
app.set("views", templatesPath)

hbs.registerPartials(partialsPath) //register partials

//---routing----
//home page
app.get("/", (req, res) => {
  res.render("index");
});

//---when click submit--- 
 app.post("/contact", async (req, res) => {
   try{
     const userData = new User(req.body);
     await userData.save();
     res.status(201).render("index");
   }catch(error){
     res.status(500).send(error);
   }
 });
//---creating server---
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
