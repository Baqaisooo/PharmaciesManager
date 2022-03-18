// this file for all functions that executed when user logged in




import firebfase_app from "./firebaseConfig.js";
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";


const auth = getAuth(firebfase_app);
onAuthStateChanged( auth, user => {

    if (!user) {
        window.location = "/"
    }
});



// logout
document.getElementById("logout").addEventListener('click', 
 function(){
    signOut(auth)
    .then(() => {
    console.log('Signed Out');
    })
    .catch(e=>{
    console.error('Sign Out Error', e);
    });
}
);