const express = require('express')
const path = require('path')
const app = express()

const fast2sms = require('fast-two-sms')

const bodyparser = require('body-parser')


 
app.use(bodyparser.urlencoded({ extended: false }))
 
app.use(bodyparser.json())
 
 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})
 
app.post('/sendmessage', (req, res) => {
    console.log(req.body.message)
    console.log(req.body.number)
 
    sendMessage(req.body.message,req.body.number,res)
})
 
function sendMessage(message,number,res) {
    var options = {
      authorization:
        "###yourapikey###",
      message:message,
      numbers: [number],
    };
 
    // send this message
 
    fast2sms
      .sendMessage(options)
      .then((response) => {
        res.send("SMS OTP Code Sent Successfully")
      })
      .catch((error) => {
        res.send("Some error taken place")
      });
}

//Home page app
app.get("/", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/home.html")
  )
})


//Add new contact
app.get("/add", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/add.html")
  )
})


//Infos about Contacts
app.get("/info", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/info.html")
  )
})

//Confirm the OTP code
app.get("/confirm", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/confirm.html")
  )
})


//List of messages
app.get("/messages", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/list-of-messages.html")
  )
})


//if are messages on your account get it here
app.get('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.type('text/xml').send(twiml.toString());
  return '/messages'
});




//List of messages
app.get("/delete", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/delete.html")
  )
})























// Send message page. In event of any error, redirected to home page. 
app.post('/send-otp', function(req, res) {
  var messageJson = {};
  try{
      messageJson["contact"] = req.body.contact;
      messageJson["text_message"] = req.body.text_message;
      sendOTP.sendmessage(messageJson, function(data) {
        var message = {};
        if(!(data === "error")) {
          message["Status"] = "SUCCESS";
          res.render('pages/otp-confirmation', {message:message})
        } else {
          message["Status"] = "FAILURE";
          res.render('pages/otp-confirmation', {message:message})
        }
      });
  }  catch(error) {
      logger.error(error);
      res.render('pages/index');
  }   
});




















app.listen(3000, ()=>{
  console.log('App Running')
})