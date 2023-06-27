const express = require('express');
const app = express();
WDS_SOCKET_PORT = 0;

// const bodyParser = require('body-parser');
require('dotenv').config()

var cors = require('cors')

const { CHATROBOT_API_KEY, port } = process.env
// prompt is the payload 

const { Configuration, OpenAIApi } = require("openai")

//configuration for defining our APIKEY

const http = require("http");
const { callbackify } = require('util');

/*
configure CORS middleware

*/


const whitelist = ['*'];
const corsOptions = {
    origin(origin, callback) {
        if (whitelist.includes('*') ||
            whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Access denied"))
        }
    }

}

// OPENAPI  ONCE INSTANTIATED WILL GIVE AN EASY INTERFACE FOR INTERACTING WITH OPENAI API

// setup server 
// console.log(CHATROBOT_API_KEY)


// app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// create new instance
const configuration = new Configuration({
    apiKey: CHATROBOT_API_KEY
})

const openai = new OpenAIApi(configuration)



app.get('/api/chats', async (req, res) => {
    console.log("derrick")
    // res.send("derrick")
})



app.post('/chats', (req, res) => {

    try {
        const { prompt } = req.body
        console.log(prompt)
        const completion = openai.createCompletion({  // task an object as an argument with few properties
            model: "gpt-3.5-turbo",
            // messages: [{ role: "user", content: "Hello world" },
            prompt: prompt, // question that is to be satisfied by the model"gpt-3.5-turbo",
            max_tokens: 2048 // the length of response text or characters

        })
        res.send(completion.data.choices[0].message)
    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }
    // console.log(chatCompletion.data.choices[0].message);
    ; // data property is object that contains the response 
    // your ans will be stored in response in your react
    // console.log((completion.data.choices[0].message))
})


//  start server  ......
// console.log(port)
const server = http.createServer(app);
const serverResponse = () => console.log(" server started on port " + 4000)

server.listen(4000, serverResponse())


