import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    child,
  } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

var namev, numbv, emav, amtv;
const db = getDatabase();

var namebox = document.getElementById("naam");

var numbox = document.getElementById("number");

var emailbox = document.getElementById("email");

var amountbox = document.getElementById("amount");

function got(event) {
  event.preventDefault();
  readfromdata();
  const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  if (namev == "" || numbv == "" || emav == "" || amtv == "") {
    alert("fields can not be blank");
  } else
    
  if (!regex_pattern.test(emav)) {

    alert("The email address is not valid");
    } else
  
  
    if (numbv < 1000000000 || numbv > 9999999999) {
      alert("Enter correct mobile number");
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

document.querySelectorAll(".btn")[0].onclick = got;
document.querySelectorAll(".btn")[1].onclick = updateData;
document.querySelectorAll(".btn")[2].onclick = deleteData;
