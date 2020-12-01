const express = require("express");
const bodyParser = require("body-parser");
const {default: Axios } = require("axios");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
    //response.send("<h1>Salam World!</h1>");
});

app.post("/",(request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);

    Axios.get("https://api.coindesk.com/v1/bpi/currentprice/EUR.json")
    .then(res =>{
        
        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log("EUR", eur);
        console.log("USD", usd);
        let message = "";

        if(userChoice === "EUR"){
            message= "EUR" + eur;
        } else {
            message = "USD" + usd;
        }
        response.send(message);
    });
    

});

app.get('/about', (request,response) => {
    response.send("Karyna says Salam!");
});

app.get("/kontakt", (request, response) =>{
    response.send("+58469375");
});

app.listen(3000, ()=>{
    console.log("Server is runningon Port 3000");
});