
// =============================== Client Routers ==========================================

// firebase-admin connection, to access firebase from server-side
var admin = require("firebase-admin");



const express = require('express');
const router = express.Router();


// All Clients Page
router.get('/', (req, res) => {
  // get all Clients
  
  var database = admin.database();
  var ref = database.ref("Accounts").orderByChild('accountType').equalTo("CLIENT");
  
  ref.once("value", function(snapshot) {
    res.render("./client/viewClients", {clients:snapshot.toJSON()})
  });
  
});





  
router.get('/newClient', (req, res) => {
  res.render("./client/newClient")
});

  
  

router.get('/updateClient/:id', (req, res) => {
  
  const accountID = req.params.id;
  
  var database = admin.database();
  
  var ref = database.ref("Accounts/"+accountID);
  
  ref.once("value", function(accountSnapshot) {
    res.render("./client/updateClient", 
    {
      account:accountSnapshot.toJSON(),
      accountID:accountID
    })
  })
  
});




router.get('/deleteClient/:clientID', (req, res) => {
  const accountID = req.params.clientID;
  var database = admin.database();

  database.ref("Accounts/"+accountID).update({active:false})
  .then(()=> res.redirect("/client"))  
});










module.exports = router