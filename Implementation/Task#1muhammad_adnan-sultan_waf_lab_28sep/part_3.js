// Define functions with delays
function signup(callback) {
    setTimeout(() => {
        console.log("Signup completed");
        if (callback) callback();
    }, 2000);
}

function sendVerificationCode(callback) {
    setTimeout(() => {
        console.log("Verification code sent");
        if (callback) callback();
    }, 4000);
}

function signin(callback) {
    setTimeout(() => {
        console.log("Signin completed");
        if (callback) callback();
    }, 3500);
}

function getData(callback) {
    setTimeout(() => {
        console.log("Data retrieved");
        if (callback) callback();
    }, 4500);
}

function checkEmail(callback) {
    setTimeout(() => {
        console.log("Email checked");
        if (callback) callback();
    }, 1500);
}

function composeEmail(callback) {
    setTimeout(() => {
        console.log("Email composed");
        if (callback) callback();
    }, 2000);
}

function sendEmail(callback) {
    setTimeout(() => {
        console.log("Email sent");
        if (callback) callback();
    }, 3000);
}

// Part i: Calling functions without controlling execution order (Uncomment to test)
/*
signup();
sendVerificationCode();
signin();
getData();
checkEmail();
composeEmail();
sendEmail();
console.log("All tasks completed…..");
*/

// Part ii: Using callbacks to control the execution order (Uncomment to test)
/*
signup(() => {
    sendVerificationCode(() => {
        signin(() => {
            getData(() => {
                checkEmail(() => {
                    composeEmail(() => {
                        sendEmail(() => {
                            console.log("All tasks completed…..");
                        });
                    });
                });
            });
        });
    });
});
*/

// Part iii: Using promises to control the execution order (Uncomment to test)

function signupPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Signup completed");
            resolve();
        }, 2000);
    });
}

function sendVerificationCodePromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Verification code sent");
            resolve();
        }, 4000);
    });
}

function signinPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Signin completed");
            resolve();
        }, 3500);
    });
}

function getDataPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Data retrieved");
            resolve();
        }, 4500);
    });
}

function checkEmailPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Email checked");
            resolve();
        }, 1500);
    });
}

function composeEmailPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Email composed");
            resolve();
        }, 2000);
    });
}

function sendEmailPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Email sent");
            resolve();
        }, 3000);
    });
}

/*
// Calling in sequence with promises (Uncomment to test)
signupPromise()
    .then(sendVerificationCodePromise)
    .then(signinPromise)
    .then(getDataPromise)
    .then(checkEmailPromise)
    .then(composeEmailPromise)
    .then(sendEmailPromise)
    .then(() => console.log("All tasks completed….."));
*/

// Part iv: Using async/await to control the execution order (Uncomment to test)

async function main() {
    await signupPromise();
    await sendVerificationCodePromise();
    await signinPromise();
    await getDataPromise();
    await checkEmailPromise();
    await composeEmailPromise();
    await sendEmailPromise();
    console.log("All tasks completed…..");
}

// Uncomment to test async/await
// main();
