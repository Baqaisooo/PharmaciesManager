

import firebfase_app from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"; 
import { getDatabase, set, ref as databaseRef, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const submitBtn = document.getElementById("submitNewClient");

submitBtn.addEventListener("click", submitNewClient);

function submitNewClient() {
    

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const ID = document.getElementById("ID_number").value;

    submitBtn.disabled = true
    submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Adding Client . . .`;
    // --------------------------------------------------------------------
    

    const auth = getAuth(firebfase_app);
    const storage = getStorage(firebfase_app);
    
    
    // --------------------------------------------------------------------
    
    
    // create new user account for Client to able to login 
    createUserWithEmailAndPassword(auth, email, password).then((authObject)=>{

        const uid = authObject.user.uid
        
        const database = getDatabase(firebfase_app);
    
        set( databaseRef(database, 'Accounts/'+uid), 
            ID?{
                email: email,
                name: name, 
                phone: phone, 
                accountType: "CLIENT", 
                ID_number: ID, 
                active:true
            }:{
                email: email,
                name: name, 
                phone: phone, 
                accountType: "CLIENT", 
                active:true
            }
        ).then((f)=>{
            
            submitBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i> Successfully Added`;
            console.log("Added >>")
            window.location = "/client/"

        });

    })
    .catch((error) => {
        
        submitBtn.disabled = false
        document.getElementById("alert").style.display = "";
        document.getElementById("errormsg").innerHTML = error.message;
        submitBtn.innerHTML = `Add Client`;
    });
    
    
    // --------------------------------------------------------------------
    
    


}
