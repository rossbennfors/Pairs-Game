const form = document.getElementById('form');

form.addEventListener('submit', function(event) {    
    var usernameInput = document.getElementById('username');
    var username = usernameInput.value;
    var errorElement = document.getElementById('error');

    const invalidChars = new Set("!@#%&*()+=^{}[]—;:“’<>?/");
    for (let i = 0; i < username.length; i++) {
        if (invalidChars.has(username[i])){
            console.log('error');
            errorElement.textContent = "Invalid username - cannot contain !@#%&*()+=^{}[]—;:“’<>?/";
            event.preventDefault();
        }
    } 

    if (username.length > 15) {
        console.log('error');
        errorElement.textContent = "Invalid username - username too long";
        event.preventDefault();
    }  
});
  
