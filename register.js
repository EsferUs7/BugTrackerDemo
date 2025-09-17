document.getElementById("registerBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    const existingUsers = ["TestAdmin"];

    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{11,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=]).{12,}$/;

    if (!username) {
        alert("Please enter the user name");
        return;
    }
    if (!usernameRegex.test(username)) {
        alert(
            "User Name must be defined with the following rules:" +
            "\n- the first character must be a letter" +
            "\n- it can contain letters, numbers, underscore, hyphen" +
            "\n- the length is between 12 to 20 including"
        );
        return;
    }
    if (existingUsers.includes(username)) {
        alert("This user is already existing");
        return;
    }
    if (!password) {
        alert("Please enter the password");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert(
            "Password must be defined with the following rules:" +
            "\n- password length must be at least 12 character" +
            "\n- password must contain number, at least one lower case letter" +
            "\n- password must contain at least one upper case letter and at least one special character" +
            "\n- allowed special characters: !@#$%^&+="
        );
        return;
    }
    if (!confirm) {
        alert("Please confirm the password");
        return;
    }
    if (password !== confirm) {
        alert("Password do not match");
        return;
    }

    alert("User account has been created successfully");
    window.location = "index.html";
});
