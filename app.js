const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const {Configuration, OpenAIApi} = require('openai')


require('dotenv').config();
require('./config/database');

const app = express();
const configuration = new Configuration({
    apiKey : process.env.OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// api routes
app.use('/api/users', require('./routes/api/users'));

// auth middleware
app.use(require('./config/auth'));

// routes needing auth go here
app.use('/api/events', require('./routes/api/events'));

// catch-all
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post("/chat", async(req,res) => {
    
    const {prompt} = req.body;
    console.log("received prompt");
    console.log(prompt);
    // console.log("Received request with prompt:");
    // console.log(prompt);
    // try {
    //     const response = await openai.createCompletion({
    //         model: "gpt-3.5-turbo-0301",
    //         prompt,
    //     });
    //     console.log(response);
    //     return res.send(response.data.choices[0].text);
    // } catch(error){
    //     console.log(error);
    // }
    return res.send(JSON.stringify("I am ChatGPT, a conversational AI language model developed by OpenAI. My purpose is to help answer questions and provide assistance to users through natural language conversation."));
});


const port = process.env.SERVER_PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});

// Your code
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code


