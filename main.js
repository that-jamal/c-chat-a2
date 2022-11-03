// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ-3myzZ6ZGSOzl2PPeQfLfuk2VVKL2LY",
    authDomain: "class-chatting-f0676.firebaseapp.com",
    databaseURL: "https://class-chatting-f0676-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "class-chatting-f0676",
    storageBucket: "class-chatting-f0676.appspot.com",
    messagingSenderId: "908020593712",
    appId: "1:908020593712:web:bf54b3285f7116890ba9f5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Auth
//--------------------------------


const loginModal = new bootstrap.Modal('#Login-modal');
loginModal.show();


document.querySelector("#login-button").addEventListener('click', function () {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const auth = getAuth();
    //sign in wth firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // hide modal
            loginModal.hide();


            initDatabase();
        })
        .catch((error) => {
            console.log(error)
        });
});


//database
//----------------------------------
const db = getDatabase(app);
// initializes Realtime Database and get a reference service
function initDatabase() {


    // create reference, where in the database we want to take info from
    const chatRef = ref(db, '/chat');


    // listens for database changes
    onChildAdded(chatRef, function (data) {

        // create element and append to list element
        const list = document.querySelector("ul")
        const message = document.createElement("li")
        message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

        list.appendChild(message)
    });
}

//new message
const input = document.querySelector("input");


input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})