
const express = require('express');

const router = express.Router();

// All Pharmacies Page
router.get('/', (req, res) => {
    // get all pharmacies
    

    res.render("./pharmacy/homepage")
});

// Middleware 
function loggedIn(req, res, next) {
    // check if logged in then show the pharmacies otherwise redirected to login page
    if (true) {
        next()
    } else {
        
    }
}

module.exports = router