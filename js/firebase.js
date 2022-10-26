 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";



 
 const firebaseConfig = {
    apiKey: "AIzaSyChYxh3PxH6FFskF4a7zIEh5mLnoSLwb0w",
    authDomain: "medidorescto.firebaseapp.com",
    databaseURL: "https://medidorescto.firebaseio.com",
    projectId: "medidorescto",
    storageBucket: "medidorescto.appspot.com",
    messagingSenderId: "151226961435",
    appId: "1:151226961435:web:b5c51428663b70562f32be",
    measurementId: "G-K746H49EPC"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 import { getDatabase, ref, set, child, get}
     from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"
     import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
const db = getDatabase();
const analytics = getAnalytics(app);

// references



const em_signup = document.getElementById('em1');
const pass_signup = document.getElementById('pass1');
const fn = document.getElementById('fn1');
const ln = document.getElementById('ln1');
const un = document.getElementById('un1');

const un_login = document.getElementById("em2");
const pass_login = document.getElementById("pass2");

// validation

function valid() {
    let emailregex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailregex.test(em_signup.value)) {
        alert("Invalid Email");
        return false;

    }
    if(pass_signup.value.length < 6) {
        alert("password must be at least 6 characters long.");
        return false;
    }
    return true;
}


// Signup User

function signupUser() {
    if(!valid()){
        return;
    };

    var terms = document.getElementById("myCheck").checked;
    if (!terms) {
        alert("Please agree to terms.");
        return;
    }

    const dbref = ref(db);

    get(child(dbref, "UsersList5/"+ un.value)).then((snapshot)=>{
        if(snapshot.exists()){
            alert("User already exists.");
        }
        else {
            set(ref(db, "UsersList5/"+ un.value), {
                username: un.value,
                firstName: fn.value,
                lastName: ln.value,
                email: em_signup.value,
                password: encPass()
            })
            .then(()=>{
                alert("User added.");
                newUser();
            })
            .catch((error)=>{
                alert("error" + error);
            })
        }
    });
}

function newUser() {
    const dbref = ref(db);
    get(child(dbref, "UsersList5/"+ un.value)).then((snapshot)=>{
        signinUser(snapshot.val());
    });
}

//Login User

function AuthenticateUser() {
    const dbref = ref(db);
    get(child(dbref, "UsersList5/"+ un_login.value)).then((snapshot)=>{
        if(snapshot.exists()){
            let dbpass = decPass(snapshot.val().password);
            if (dbpass == pass_login.value) {
                signinUser(snapshot.val());
            } else {
                alert("Invalid User/Password.");
            }
        }
        else {
            alert("Invalid User/Password.");
        }
    });
}

//assign events

document.getElementById("submit1").addEventListener('click', signupUser);
document.getElementById("submit2").addEventListener('click', AuthenticateUser);


//encrypt 

function encPass() {
    var pass12 = CryptoJS.AES.encrypt(pass_signup.value, pass_signup.value);
    return pass12.toString();
}

//decrypt 

function decPass(dbpass) {
    var pass12 = CryptoJS.AES.decrypt(dbpass, pass_login.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}

// login 

function signinUser(user) {
    let keepLoggedIn = document.getElementById('kli').checked;
    if (!keepLoggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location="index.html";
    } else {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location="index.html";
    }
}