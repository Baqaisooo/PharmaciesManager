

import firebfase_app from "./firebaseConfig.js";
import { onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";


const auth = getAuth(firebfase_app);
onAuthStateChanged( auth, user => {

    if (user) {
        window.location = "pharmacy"
    }
});

// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkEmail(email){
    
    if(!email){
        document.getElementById("email").style.border = "red solid 3px";
    }else{
        document.getElementById("email").style.border = "none";
    }

}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkPassword(password){

    if(!password){
        document.getElementById("password").style.border = "red solid 3px";
    }else{
        document.getElementById("password").style.border = "none";
    }
}

// login
document.querySelector('button').addEventListener('click', 
function(event){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
            checkEmail(email);
            checkPassword(password);
            return;
    } else {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            window.location = "pharmacy"
        })
        .catch((error) => {
            document.getElementById("login_alert").style.display = "";
        });
    }
        
}
);


