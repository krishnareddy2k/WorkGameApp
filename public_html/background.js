/*  
 * Student Info: Name=KrishnaReddy Kalyanam, ID=13778 
 * Subject: CS557B_HW2_Summer_2015 
 * Author: KrishnaReddy 
 * Filename: background.css.js  
 * Date and Time: Jun 20, 2015 6:24:02 PM  
 * Project Name: WordGameApp  
 */
var regUsers = [];
function loadData() {
    changeImage();//shuffling the advertisement images on side bar
    getCurrentUser();
}

function registerUser() {

    var user = {};
    if (validateForm()) {
        user.username = document.registerForm.username.value;
        user.password = document.registerForm.password.value;
        user.firstname = document.registerForm.firstname.value;
        user.lastname = document.registerForm.lastname.value;
        user.email = document.registerForm.email.value;
        document.registerForm.male.checked ? user.gender = "Male" : user.gender = "Female";
        var users = JSON.parse(localStorage.getItem('regUsers'));
        if (users === null) {
            users = [];
        }
        var oldUser = getUserFromStore(users, user.username);
        if (oldUser == "undefined" || oldUser == null) {
            users.push(user);
            localStorage.setItem("regUsers", JSON.stringify(users));
            console.log(user.username + " has registered successfully..");
            alert(user.username + " is registered successfully, please login now");
            window.event.returnValue = false;
            location.href = "http://localhost:8383/WordGameApp/login.html";
        } else {
            alert(user.username + " is already exists in DB");
            return false;
        }
    }
}

function validateForm() {
    var isValid = true;
    var uname = document.getElementById("username").value;
    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById("lastname").value;
    var pwd = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    if (uname == "") {
        isValid = false;
    } else if ((fname == "")) {
        isValid = false;
    } else if ((lname == "")) {
        isValid = false;
    } else if ((pwd == "")) {
        isValid = false;
    } else if ((email == "")) {
        isValid = false;
    } else {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        isValid = re.test(email);
        isValid ? "" : alert("Invalid Email");
    }
    return isValid;
}

function logoutCurrentUser() {

    if (typeof (localStorage) !== "undefined") {
        localStorage.removeItem("currentUser");
        console.log("logout successful...");
        alert("logout successful...");
//        window.event.returnValue = false;
        location.href = "http://localhost:8383/WordGameApp/login.html";
    }
}
function isUserLoggedIn() {
    if (typeof (localStorage) !== "undefined") {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user !== null) {
            console.log("Current User : " + JSON.stringify(user));
            document.getElementById("logInfo").innerHTML = user.username + " is already logged in to the application .. !!!";
            document.getElementById("loginDiv").style.visibility = "hidden";
            document.getElementById("logoutA").style.visibility = 'block';
        } else {
            console.log("Please login to the application..");
            document.getElementById("article").style.display = 'block';
            document.getElementById("logoutA").style.visibility = "hidden";
        }
    } else {
        alert("Please login to the application or register");
    }
}


function getCurrentUser() {
    if (typeof (localStorage) !== "undefined") {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser !== null) {
            console.log("Current User : " + JSON.stringify(currentUser));
            document.getElementById("welcomeUser").innerHTML = "Welcome .. " + currentUser.username;
            document.getElementById("logoutA").style.display = 'block';
        } else {
            console.log("Please login to the application..");
            window.event.returnValue = false;
            location.href = "http://localhost:8383/WordGameApp/login.html";
        }
    } else {
        alert("Please login to the application or register");
    }
}

function isValidUser() {
    var loginName = document.getElementById("username").value;
    if (loginName === "" || loginName === null) {
        alert("username is required.");
        return false;
    }
    var loginPwd = document.getElementById("password").value;
    if (loginPwd === "" || loginPwd === null) {
        alert("password is required.");
        return false;
    }
    if (typeof (localStorage) !== "undefined") {
        var regUsers = JSON.parse(localStorage.getItem("regUsers"));
        if (regUsers !== null) {
            var user = getUserFromStore(regUsers, loginName);
            if (user !== null) {
                if ((user.username === loginName && user.password === loginPwd)) {
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    alert("Congrats ..!! " + loginName + ", your login is successful ...");
                    window.event.returnValue = false;
                    location.href = "http://localhost:8383/WordGameApp/index.html";
                } else {
                    alert("Invalid username or password");
                    window.event.returnValue = false;
                }
            } else {
                alert(loginName + " not found in DB , please register / signup now");
                window.event.returnValue = false;
                location.href = "http://localhost:8383/WordGameApp/register.html";
            }
        } else {
            alert(" No user in DB , please register / signup now");
            window.event.returnValue = false;
            location.href = "http://localhost:8383/WordGameApp/register.html";
        }
    } else {
        alert("localStorage is undefined !!!");
        return false;
    }
}

function getUserFromStore(regUsers, loginName) {
    for (var user = 0; user < regUsers.length; user++) {
        if (regUsers[user].username === loginName) {
            console.log(regUsers[user].username + " : " + JSON.stringify(regUsers[user]));
            localStorage.removeItem(user);
            return regUsers[user];
        }
    }
}

function getRegUsers() {

    if (typeof (localStorage) !== "undefined") {
        var rUsers = localStorage.getItem("regUsers");
        if (rUsers !== null && rUsers !== "undefined") {
            for (var user = 0; user < rUsers.length; user++)
                for (var prop in user) {
                    console.log("prop : " + user[prop]);
                    console.log("prop : " + JSON.stringify(user));
                }
        }
    } else {
        console.log("Sorry! No Web Storage support..");
    }
}
function changeImage()
{
    var img = document.getElementById("asideImg");
    var x = Math.floor(Math.random() * largeImages.length);
    img.src = largeImages[x];
    if (screen.width > 400) {
        img.src = largeImages[x];
    } else if (screen.width <= 400) {
        img.src = smallImages[x];
    }
    x++;
    if (x >= largeImages.length) {
        x = 0;
    }
    fadeImg(img, 1000, true);
    setTimeout("changeImage()", 30000);
}

function fadeImg(el, val, fade) {
    if (fade === true) {
        val--;
    } else {
        val++;
    }
    if (val > 0 && val < 100) {
        el.style.opacity = val / 100;
        setTimeout(function () {
            fadeImg(el, val, fade);
        }, 10);
    }
}
var smallImages = [];
smallImages[0] = "./images/word1_small.jpg";
smallImages[1] = "./images/word2_small.jpg";
smallImages[2] = "./images/word3_small.jpg";
var largeImages = [];
largeImages[0] = "./images/word1.jpg";
largeImages[1] = "./images/word2.jpg";
largeImages[2] = "./images/word3.jpg";
setTimeout("changeImage()", 30000);

