

// firebase-admin connection, to access firebase from server-side
var admin = require("firebase-admin");

var serviceAccount = require("../pharmacy-fb5d1-firebase-adminsdk-b5f1e-0c8fcf81aa.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pharmacy-fb5d1-default-rtdb.firebaseio.com",
  storageBucket: 'pharmacy-fb5d1.appspot.com'
});




const express = require('express');
const router = express.Router();

// All Pharmacies Page
router.get('/', (req, res) => {
    // get all pharmacies
    
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
  const pharmacy = req.body.pharmacy;
  const image = req.body.logo;
  
  // const bucket = admin.storage().bucket()

  // console.log(bucket)
  // console.log("===========================")
  // console.log(req.file)


  
  // async function uploadFile() {
  //   await bucket.upload('C:\\Users\\aboal\\OneDrive\\سطح المكتب\\logo.png', {
  //     destination: pharmacy
  //   });
  // }

  // uploadFile().catch(console.error)




  console.log( req.body )
  // res.render("./pharmacy/newPharmacy")
});





router.get('/detail/:id', (req, res) => {
  res.send(req.params.id)
});


module.exports = router