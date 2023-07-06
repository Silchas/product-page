document.querySelector('.login-btn').addEventListener('click', function() {
    document.querySelector('.formcontainer').style.display = 'block';
})

//     document.querySelector('#registerbtn').addEventListener('click', function() {
//     document.querySelector('#register').classList.toggle('visible');
//     })
    
    
const container = document.querySelector(".formcontainer"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });

// select the sign-up form element
const signUpForm = document.querySelector('.formcontainer .signup form');

// select the sign-up button element
const signUpButton = signUpForm.querySelector('input[type="button"]');

// add an event listener to the sign-up button
signUpButton.addEventListener('click', function(event) {
    // prevent the default action of the button
    event.preventDefault();

    // get the values of the email and password fields
    let email = signUpForm.querySelector('input[type="text"][placeholder="Enter your email"]').value;
    let password = signUpForm.querySelector('input[type="password"][placeholder="Create a password"]').value;

    // define an object to hold the user details
    let userDetails = {
        email: email,
        password: password
    };

    // get the existing users from local storage
    let existingUsersString = localStorage.getItem('users');
    let existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

    // add the new user to the array of existing users
    existingUsers.push(userDetails);

    // convert the array of users to a JSON string
    let usersString = JSON.stringify(existingUsers);

    // store the JSON string in local storage
    localStorage.setItem('users', usersString);
});

// select the login form element
const loginForm = document.querySelector('.formcontainer .login form');

// select the login button element
const loginButton = loginForm.querySelector('input[type="button"]');

// add an event listener to the login button
loginButton.addEventListener('click', function(event) {
    // prevent the default action of the button
    event.preventDefault();

    // get the values of the email and password fields
    let email = loginForm.querySelector('input[type="text"][placeholder="Enter your email"]').value;
    let password = loginForm.querySelector('input[type="password"][placeholder="Enter your password"]').value;

    // check if the user is registered and the entered password is correct
    if (isRegistered(email) && isPasswordCorrect(email, password)) {
        // the login was successful, redirect to the product.html page
        window.location.href = 'product.html';
    } else {
        // the login was not successful, display an error message
        alert('Invalid email or password');
    }
});

// define a function to check if a user is registered
function isRegistered(email) {
    // get the existing users from local storage
    let existingUsersString = localStorage.getItem('users');
    let existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

    // check if any of the existing users have an email property that matches the given email
    for (let i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].email === email) {
            // a matching user was found, return true
            return true;
        }
    }

    // no matching user was found, return false
    return false;
}

// define a function to check if the entered password is correct for a given email
function isPasswordCorrect(email, password) {
    // get the existing users from local storage
    let existingUsersString = localStorage.getItem('users');
    let existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

    // check if any of the existing users have an email property that matches the given email and a password property that matches the given password
    for (let i = 0; i < existingUsers.length; i++) {
        if (existingUsers[i].email === email && existingUsers[i].password === password) {
            // a matching user was found, return true
            return true;
        }
    }

    // no matching user was found, return false
    return false;
}
