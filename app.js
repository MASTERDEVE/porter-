const express= require("express");
const app=express();
const mongoose=require("mongoose");

const bodyParser= require("body-parser");
const ejs= require("ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");
app.use(express.static("public"));

const clientSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
     

},
 Houseaddress:{type: String,
 required: true,
 trim: true
},
number:{
    type:Number,
}

});
const riderSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
     

},
 Houseaddress:{type: String,
 required: true,
 trim: true
},
Mobilenumber:{
    type:Number,
},
AadharcardNumber:{
  type:Number,
},
Pancardnumber:{
type:Number,
}

});


const contactSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
     

},
 message:{type: String,
 required: true,
 trim: true
},

});
const Contact =mongoose.model("Contact",contactSchema);
const Client= mongoose.model("Client",clientSchema);
const Rider=mongoose.model("Rider",riderSchema);
const p1="Simplifying Urban Logistics: Smarter Transport, Optimized Routes, and Seamless Moving for a Sustainable Future"
const p2="This emphasizes the ease of booking and managing moving services with transparency, security, and real-time tracking."

async function main(){

    try{
    await mongoose.connect("mongodb://localhost:27017/porterDB");
                                                                                         
                                                                                
    const client= await Client.find();
    const contact= await Contact.find();
    const rider= await Rider.find();
     console.log(contact);
     console.log(client);
    console.log(rider);
    }
    catch(err){
      console.log(err);
    }
    
    }

main();
app.get("/",function(req,res){
    res.render("home")
})
app.get("/signup",function(req,res){
    res.render("signup")
})

app.get("/client",function(req,res){
    res.render("client");
})

app.get("/rider",function(req,res){
    res.render("rider");
})
app.get("/transferz",function(req,res){
    res.render("transferz");
})
app.get("/contact",function(req,res){
    res.render("contact");
})

app.post("/contact", async function(req,res){
    const fullname=req.body.fullname;
    const email=req.body.email;
    const message=req.body.message;
  try{
    const contact = new Contact({ fullname, email, message });
    await contact.save();
    console.log(fullname, email, message);
}catch(err){
    console.log(err);
}
})
app.post("/client", async function(req,res){
    const fullname=req.body.fullname;
    const email=req.body.email;
    const Houseaddress=req.body.text;
    const number= req.body.number;
  try{
    const client = new Client({fullname, email, Houseaddress, number});
    await client.save();
    console.log(fullname, email,Houseaddress,number);
    res.redirect("/transferz")
}catch(err){
    console.log(err);
}
})
app.post("/rider", async function(req,res){
    const fullname=req.body.fullname;
    const email=req.body.email;
    const Houseaddress=req.body.text;
    const number= req.body.number;
    const AadharcardNumber=req.body.aadhar;
    const Pancardnumber=req.body.pancard;
  try{
    const rider = new Rider({ fullname, email, Houseaddress,number,AadharcardNumber,Pancardnumber});
    await rider.save();
    console.log(fullname, email,Houseaddress,number,AadharcardNumber,Pancardnumber);
    res.redirect("/transferz")
}catch(err){
    console.log(err);
}
})



app.listen(3000,function(req,res){
    console.log("Server is running on port 3000")
})