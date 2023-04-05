const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

const app = express();

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

if (process.env.PORT) {
    app.listen(process.env.PORT, function() {
        console.log(`Express app running on port ${process.env.PORT}`);
    });
}

module.exports = app;

