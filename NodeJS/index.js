var express = require('express')

const path = require('path')

const bodyparser = require('body-parser')
 
const app = express()
 
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

//List of messages
app.get("/delete", function(req, res) {
  res.sendFile(
    path.join(__dirname, "/views/delete.html")
  )
})


app.listen(5000, () => {
    console.log("App is listening on port 5000")
})
