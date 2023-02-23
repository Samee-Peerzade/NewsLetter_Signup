const express = require ("express")

const bodyParser = require("body-Parser")
const request = require("request")

const app = express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

// Always keep a copy of all code above


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req,res){

    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email
    const https = require("https")

    const data={
        members:[
        {
            email_address : email,
            status:"subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName,
            }

        }]
    };

    const jsonData=JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/70fb9ada3a";

    const options={
        method:"POST",
        auth : "samee1:a049f987709ccad3156e4ed20b4229bed-us18"
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
            
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end()





});

app.post("/failure", function(req, res){
    res.redirect("/")
});

    

app.listen(3000, function(){
    console.log("server is running on port 3000")
})