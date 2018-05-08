var express = require ('express')
var cors = require ('cors')
var app = express()
var mongoose = require ('mongoose')
var bodyParser = require('body-parser')
var User = require('./User.js');
var jwt = require ('jwt-simple');
var posts = [
    {message: "hello"},
    {message: "Appy" }
]

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req, res) =>{
    res.send(posts);
})

app.get('/users', async (req, res) =>{
    try {
        var users = await User.find({}, '-password -__v')
        res.send(users)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.get('/profile/:id', async (req, res) =>{
    console.log()
    try {
        var users = await User.findById(req.params.id, '-password -__v')
        res.send(user)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.post('/register', (req, res) =>{
    var userData = req.body
    var user = new User(userData)
    
    user.save((err , result) => {
        if(err)
            console.log('error in saving')
          res.sendStatus(200)
    })
    
})

app.post('/login', async (req, res) => {
    var userData = req.body

    var user = await User.findOne({username: userData.username})
    

    if(!user)
     return res.status(401).send({message: 'Email or Password invalid'})

     if(userData.password != user.password)
     return res.status(401).send({message: 'Email or Password invalid'})

     var payload = {}

     var token = jwt.encode(payload , '123')
     res.status(200).send({token})
})


mongoose.connect('mongodb://test:test@ds121599.mlab.com:21599/messageboard', (err) => {
    if(!err)
        console.log('connected to mongo')
})

app.listen(4000)