require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
    next();
});

app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome")
})

require('./routes')(app);

const PORT = process.env.PORT || 4000;
const db = require('./models')
db.sequelize.sync({force:false})
    .then(() => {
        console.log("Models Synced")
    })
    .catch(err => console.log(err))
    

app.listen(PORT)
console.log("Server Listening on " + PORT)