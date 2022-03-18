

import firebfase_app from "./firebaseConfig.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js"; 
import { getDatabase, ref as databaseRef, update } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const element = document.getElementById("submitUpdatePharmacy");

element.addEventListener("click", submitUpdatePharmacy);

function submitUpdatePharmacy() {
    const [accountID, pharmacyID] = (element.value).split(" ");
    const oldLogo = document.getElementById("oldLogo").value;
    const pharmacyName = document.getElementById("pharmacy").value;
    const insta = document.getElementById("insta").value;
    const twitter = document.getElementById("twitter").value;
    const drName = document.getElementById("drName").value;
    const phone = document.getElementById("phone").value;


    // --------------------------------------------------------------------
    

    const storage = getStorage(firebfase_app);
    
    
    // --------------------------------------------------------------------
    
    
    // upload image to storage and then get the image URL
    
    var file = document.getElementById("logo").files[0];
    
    const storage_Ref = storageRef(storage, '/Pharmacies/'+pharmacyName+'/logo');
    
    if (oldLogo) {    
        update( databaseRef(getDatabase(firebfase_app), 'Accounts/'+accountID), 
        {
            name: drName, 
            phone: phone,
        }
        ).then(()=>
        
            update( databaseRef(getDatabase(firebfase_app), 'Pharmacies/'+pharmacyID), 
            {
                instaAccount: insta, 
                name: pharmacyName, 
                twitterAccount:twitter
            }
            ).then(location.href = "/pharmacy/").catch((error)=> console.log(error.message))
            
        ).catch((error)=> console.log(error.message))
        
                
    }
    else{
        uploadBytes(storage_Ref, file).then(() => {
            getDownloadURL(storage_Ref).then((url)=>
            
                update( databaseRef(getDatabase(firebfase_app), 'Accounts/'+accountID), 
                {
                    name: drName, 
                    phone: phone,
                }
                ).then(()=>
                
                    update( databaseRef(getDatabase(firebfase_app), 'Pharmacies/'+pharmacyID), 
                    {
                        instaAccount: insta, 
                        name: pharmacyName, 
                        pic: url, 
                        twitterAccount:twitter
                    }
                    ).then(location.href = "/pharmacy/").catch((error)=> console.log(error.message))
                    
                ).catch((error)=> console.log(error.message))
                
                
                
            ).catch((error)=> console.log(error.message))    
        });       
        
    }
            
}