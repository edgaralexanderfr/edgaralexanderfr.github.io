const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');

const port = 9999;

app = express();
app.use(serveStatic(path.join(__dirname, './')));

app.get('/es', (req, res) => {
    res.redirect('/es.html');
});

app.listen(port);
