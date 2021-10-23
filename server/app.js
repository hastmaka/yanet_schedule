const express = require('express');
const bodyParser = require('body-parser');
const app = express();

process.env.SERVER_PORT = '9100';
const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const corsOption = {
    origin: true,
    methods: "GET,PUT,POST,OPTIONS,DELETE",
    allowedHeaders: "Origin,X-Requested-With,Content-type,Accept,X-Access-Token,X-Key,cache-control, x-access-token",
    credentials: true,
    maxAge: 3600
};
const cors = require('cors')(corsOption);
app.use(cors);

app.use(indexRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`App listening on port ${process.env.SERVER_PORT}`);
});