

const express = require("express")
const app = express()


app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('static'))




const pharmacyRouter = require("./routers/pharmacy");
app.use('/pharmacy',pharmacyRouter);

const clientRouter = require("./routers/client");
app.use('/client',clientRouter);

const suggestionRouter = require("./routers/suggestion");
app.use('/suggestion',suggestionRouter);






app.get('/', (req, res) => {
    res.render("login/login")
});



const port = 3000;

app.listen(port, () => {
    console.log(`Now go to http://localhost:${port}/`)
  });
