

import firebfase_app from "./firebaseConfig.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"; 
import { getDatabase, ref as databaseRef, push } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const submitBtn = document.getElementById("submitNewMedicine");

submitBtn.addEventListener("click", submitNewMedicine);

function submitNewMedicine() {
    
    const pharmacyid = submitBtn.value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    submitBtn.disabled = true
    // --------------------------------------------------------------------
    
    const storage = getStorage(firebfase_app);
    const database = getDatabase(firebfase_app);
        
    // --------------------------------------------------------------------
    
    
    // upload image to storage and then get the image URL
    
    var file = document.getElementById("image").files[0];
    
    const pharmacyName = document.getElementById("pharmacy_name").innerHTML;
    
    const storage_Ref = storageRef(storage, '/Pharmacies/'+pharmacyName+'/'+name+".jpg");
    
    uploadBytes(storage_Ref, file).then(() => {
        getDownloadURL(storage_Ref).then((url)=>
    
            push( databaseRef(database, 'Medicine/'), 
                {
                    active: true,
                    pharmacyID: pharmacyid, 
                    name: name, 
                    pic: url,
                    price:price
                }
            ).then((medicine)=>{
                submitBtn.disabled = false
                document.getElementById("name").value = "";
                document.getElementById("price").value = "";
                document.getElementById("image").value = "";
                document.getElementById("previewLogo").src = "";
                console.log(medicine)
            })
        )    
    })
    
    
    
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