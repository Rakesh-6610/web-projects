const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "static/index.html");
})


app.post("/register", (req, res) => {

    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const fbLink = req.body.facebookLink;
    const email = req.body.email;
    const phone = req.body.phoneNumber;

    const segments = [];
    
    if (req.body.quiz) { segments.push("quiz") }
    if (req.body.writing) { segments.push("writing") }
    if (req.body.poster) { segments.push("poster") }
    if (req.body.speech) { segments.push("speech") }
    if (req.body.meme) { segments.push("meme") }

    const url = "https://us9.api.mailchimp.com/3.0/lists/3126c4f861";
    const options = {
        method: "POST",
        auth: `Rakesh:${process.env.MAILCHIMP_API_KEY}`,
    }

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                    FBLINK: fbLink,
                    PHONE: phone,
                    SEGMENTS: String(segments)
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            console.log("Successfully subscribed to the mailchimp list");
        } else {

            console.log("Failed to subscribe to the mailchimp list");
            response.on("data", function (data) {
                console.log(JSON.parse(data));
            })
        }
    })
    request.write(jsonData);
    request.end();

})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})