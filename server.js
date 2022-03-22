

const express = require("express")
const app = express()


app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('static'))




const pharmacyRouter = require("./routers/pharmacy");
app.use('/pharmacy',pharmacyRouter);






app.get('/', (req, res) => {
    res.render("login/login")
});




app.listen(3000);


