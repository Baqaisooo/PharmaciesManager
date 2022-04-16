

import firebfase_app from "./firebaseConfig.js";
import { getDatabase, ref as databaseRef, update } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 



const submitBtn = document.getElementById("submitUpdatedClient");

submitBtn.addEventListener("click", submitUpdatedClient);

function submitUpdatedClient() {
    const accountID = submitBtn.value;
    const ID_number = document.getElementById("ID_number").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    submitBtn.disabled = true
    submitBtn.innerHTML = `<i class="fa fa-spinner fa-spin"></i> Updating Client . . .`;
    // --------------------------------------------------------------------
    
    
        
    update( databaseRef(getDatabase(firebfase_app), 'Accounts/'+accountID), 
    {
        name: name, 
        phone: phone,
        ID_number:ID_number
    }
    ).then(()=>{
        submitBtn.innerHTML = `<i class="fa fa-thumbs-up" aria-hidden="true"></i> Updated Successfully`;
        location.href = "/client/"
        })
        .catch((error)=> console.log(error.message));
          
}