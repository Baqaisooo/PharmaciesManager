

const express = require("express")
const app = express()


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static('static'))





const authRouter = require("./routers/auth");
app.use('/auth', authRouter);

const pharmacyRouter = require("./routers/pharmacy");
app.use('/pharmacy',pharmacyRouter);






app.get('/', (req, res) => {
    // if already logged in, then redirect to the the homepage
    // otherwise go to login
    res.render("login/login")
});




app.listen(3000);

