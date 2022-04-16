
// =============================== Suggestions Routers ==========================================

// firebase-admin connection, to access firebase from server-side
var admin = require("firebase-admin");



const express = require('express');
const router = express.Router();


// All Clients Page
router.get('/', (req, res) => {
  // get all Clients
  
  var database = admin.database();
  var ref = database.ref("Suggestions");
  
  ref.once("value", function(snapshot) {
    res.render("./suggestion/suggestions", {suggestions:snapshot.toJSON()})
  });
  
});








module.exports = router