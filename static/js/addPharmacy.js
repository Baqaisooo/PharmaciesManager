

import firebfase_app from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"; 
import { getDatabase, set, ref as databaseRef, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const submitBtn = document.getElementById("submitNewPharmacy");

submitBtn.addEventListener("click", submitNewPharmacy);

function submitNewPharmacy() {
    

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const pharmacyName = document.getElementById("pharmacy").value;
    const insta = document.getElementById("insta").value;
    const twitter = document.getElementById("twitter").value;
    const drName = document.getElementById("drName").value;
    const phone = document.getElementById("phone").value;

    submitBtn.disabled = true
    // --------------------------------------------------------------------
    

    const auth = getAuth(firebfase_app);
    const storage = getStorage(firebfase_app);
    
    
    // --------------------------------------------------------------------
    
    
    // create new user account for pharmacy to able to login 
    createUserWithEmailAndPassword(auth, email, password).then(()=>{
        
        // upload image to storage and then get the image URL
        
        var file = document.getElementById("logo").files[0];
        
        const storage_Ref = storageRef(storage, '/Pharmacies/'+pharmacyName+'/logo');
        
        uploadBytes(storage_Ref, file).then(() => {
            getDownloadURL(storage_Ref).then((url)=>
                createNewPharmacyAccount(insta, pharmacyName,url,twitter, drName, email, phone)
            )    
        })
    })
    .catch((error) => {
        
        submitBtn.disabled = false
        document.getElementById("alert").style.display = "";
        document.getElementById("errormsg").innerHTML = error.message;
    });
    
    
    // --------------------------------------------------------------------
    
    


}



function createNewPharmacyAccount(instaAccount, name, pic, twitterAccount, drName, email, phone) {
    const database = getDatabase(firebfase_app);
    
    push( databaseRef(database, 'Pharmacies/'), 
        {
            active: true,
            instaAccount: instaAccount, 
            name: name, 
            pic: pic, 
            twitterAccount:twitterAccount
        }
    ).then((pharmacy)=>{
        createNewParmacyDetailAccount(drName, email, phone, pharmacy.key)
    });
}



function createNewParmacyDetailAccount(drName, email, phone, pharmacyID) {
    const database = getDatabase(firebfase_app);
    
    push( databaseRef(database, 'Accounts/'), 
        {
            email: email,
            name: drName, 
            phone: phone, 
            pharmacyID:pharmacyID,
            accountType: "PHARMACY", 
            active:true
        }
    ).then((f)=>{
        
        submitBtn.disabled = false
        console.log("Added >>")
        window.location = "/pharmacy/"

    });
}