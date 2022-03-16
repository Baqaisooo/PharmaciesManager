

// firebase-admin connection, to access firebase from server-side
var admin = require("firebase-admin");
var serviceAccount = require("../pharmacy-fb5d1-firebase-adminsdk-b5f1e-0c8fcf81aa.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pharmacy-fb5d1-default-rtdb.firebaseio.com"
});


const express = require('express');

const router = express.Router();

// All Pharmacies Page
router.get('/', (req, res) => {
    // get all pharmacies
    
    // As an admin, the app has access to read and write all data, regardless of Security Rules
    var db = admin.database();
    var ref = db.ref("Pharmacies");

    ref.once("value", function(snapshot) {
        res.render("./pharmacy/homepage", {pharmacies:snapshot.toJSON()})
    });

});






router.get('/newPharmacy', (req, res) => {
  res.render("./pharmacy/newPharmacy")
});


router.post('/newPharmacy', (req, res) => {
  console.log(req.body)
  console.log( req.body['phone'])
  // res.render("./pharmacy/newPharmacy")
});





router.get('/detail/:id', (req, res) => {
  res.send(req.params.id)
});


module.exports = router