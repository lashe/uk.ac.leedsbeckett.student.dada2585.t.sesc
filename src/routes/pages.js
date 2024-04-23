const path = require('path');
const page = require("express").Router();

page.get('/login', (req, res) => {
    res.render(path.join(__dirname, 'src/views', 'login'));
});

page.get('/register', (req, res) => {
    res.render(path.join(__dirname, 'src/views', 'register'));
});

module.exports = page