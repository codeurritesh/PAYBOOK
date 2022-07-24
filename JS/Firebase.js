import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    child,
  } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

var namev, numbv, emav, amtv;
const db = getDatabase();

var namebox = document.getElementById("naam");

var numbox = document.getElementById("number");

var emailbox = document.getElementById("email");

var amountbox = document.getElementById("amount");

function gave(event)
{
    event.preventDefault();
    readfromdata();
    if (namev == "" || numbv == "" || emav == "" || amtv == "") {
        alert("fields can not be blank");
    }
    else {
        set(ref(db, "data/" + numbv),
            {
                name: namev,
                phno: numbv,
                email: emav,
                amount: amtv,
                
            })
            .then(() => {
                alert("Data stored sucessfully");
            })
    
            .catch((error) => {
                alert("Unsucessful", error);
            });
            clearFormData();
            
    }       
}
function deleteData(event) {
    event.preventDefault();
    readfromdata();
    if (numbv == "" ) {
      alert(" Give delete Reference as mobile number");
    } else {
      // Code to remove the data from Firebase
      if (confirm("Are your Sure to Delete this ?")) {
        remove(ref(db, "data/" + numbv))
          .then(() => {
            alert("Data Deleted Successfully");
          })
          .catch((error) => {
            alert("Unsccussful", error);
          });
      }
  
      clearFormData();
    }
}
function updateData(event) {
    event.preventDefault();
    readfromdata();
    // Code to update  data in Firebase
    if (numbv == "") {
        alert(" Give Update Reference as mobile number");
    } else {
        
       
        update(ref(db, "data/" + numbv), {
            amount: amtv
     
        })
            .then(() => {
                alert("Data Updated Successfully");
            })
            .catch((error) => {
                alert("Unsccussful", error);
            });
  
        clearFormData();
    }
}
  function clearFormData() {
    amountbox.value = "";
    emailbox.value = "";
    numbox.value = "";
    namebox.value = "";
  }



function readfromdata()
{
    namev = namebox.value;
    numbv = numbox.value;
    emav = emailbox.value;
    amtv = amountbox.value;
    console.log(namev,numbv,emav,amtv);
}

document.querySelectorAll(".btn")[0].onclick = gave;
document.querySelectorAll(".btn")[1].onclick = updateData;
document.querySelectorAll(".btn")[2].onclick = deleteData;
