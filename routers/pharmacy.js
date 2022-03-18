

// firebase-admin connection, to access firebase from server-side
var admin = require("firebase-admin");

var serviceAccount = require("../pharmacy-fb5d1-firebase-adminsdk-b5f1e-0c8fcf81aa.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pharmacy-fb5d1-default-rtdb.firebaseio.com",
});




const express = require('express');
const router = express.Router();

// All Pharmacies Page
router.get('/', (req, res) => {
  // get all pharmacies
  
    var database = admin.database();
    var ref = database.ref("Pharmacies").orderByChild('active').equalTo(true);
    
    ref.once("value", function(snapshot) {
      res.render("./pharmacy/homepage", {pharmacies:snapshot.toJSON()})
    });
    
  });
  
  
  
  
  
  
router.get('/newPharmacy', (req, res) => {
  res.render("./pharmacy/newPharmacy")
});




router.get('/updatePharmacy/:id', (req, res) => {
  
  const pharmacyId = req.params.id;
  
  var database = admin.database();
  
  var ref = database.ref("Pharmacies/"+pharmacyId)
  ref.once("value", function(pharmacySnapshot) {
    ref = database.ref("Accounts/").orderByChild("pharmacyID").equalTo(pharmacyId)
    
    ref.once("value", function(accountSnapshot) {
      res.render("./pharmacy/updatePharmacy", 
      {
        pharmacy:pharmacySnapshot.toJSON(), 
        account:accountSnapshot.toJSON()[Object.keys(accountSnapshot.toJSON())[0]], 
        accountID:Object.keys(accountSnapshot.val())[0]
      }
      )
    });
    
  });
  
});




router.get('/deletePharmacy/:pharmacyID', (req, res) => {
  const pharmacyID = req.params.pharmacyID
  var accountID = ""
  var database = admin.database();
  var ref = database.ref("Accounts/").orderByChild("pharmacyID").equalTo(pharmacyID);

  ref.once("value", function(snapshot) {
    accountID = Object.keys(snapshot.val())[0]
  }).then(()=>{
    database.ref("Pharmacies/"+pharmacyID).update({active:false})
    .then(()=>{
      database.ref("Accounts/"+accountID).update({active:false})
    }).then(()=> res.redirect("/pharmacy"))
  })
  
  
  // res.render("./pharmacy/")
});







router.get('/detail/:id', (req, res) => {
  res.send(req.params.id)
});


module.exports = router