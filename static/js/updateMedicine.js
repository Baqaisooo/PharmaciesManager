

import firebfase_app from "./firebaseConfig.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"; 
import { getDatabase, ref as databaseRef, update } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const element = document.getElementById("updateMedicine");

element.addEventListener("click", submitUpdateMedicine);

function submitUpdateMedicine() {
    const medicineID = element.value;
    const pharmacyName = document.getElementById("pharmacy_name").innerHTML;
    const oldLogo = document.getElementById("oldLogo").value;
    const updatedName = document.getElementById("updatedName").value;
    const updatedPrice = document.getElementById("updatedPrice").value;


    // --------------------------------------------------------------------
    

    const storage = getStorage(firebfase_app);
    
    
    // --------------------------------------------------------------------
    
    
    // upload image to storage and then get the image URL
    
    var updatedImage = document.getElementById("updatedImage").files[0];
    
    const storage_Ref = storageRef(storage, '/Pharmacies/'+pharmacyName+'/'+updatedName);
    
    if (oldLogo) {    
        update( databaseRef(getDatabase(firebfase_app), 'Medicine/'+medicineID), 
        {
            name: updatedName, 
            price: updatedPrice,
        }
        )
        .then(location.reload())
        .catch((error)=> console.log(error.message))
            
    }
    else{
        uploadBytes(storage_Ref, updatedImage).then(() => {
            getDownloadURL(storage_Ref).then((url)=>
            
                update( databaseRef(getDatabase(firebfase_app), 'Medicine/'+medicineID), 
                {
                    name: drName, 
                    phone: phone
                }
                ).then(()=>
                
                    update( databaseRef(getDatabase(firebfase_app), 'Pharmacies/'+pharmacyID), 
                    {
                        name: drName, 
                        phone: phone,
                        pic: url
                    }
                    )
                    .then(location.reload())
                    .catch((error)=> console.log(error.message))
                    
                ).catch((error)=> console.log(error.message))
                
                
                
            ).catch((error)=> console.log(error.message))    
        });       
        
    }
            
}