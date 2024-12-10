// Toggle forms
function showLogin() {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-toggle").classList.add("active");
    document.getElementById("register-toggle").classList.remove("active");
  }
  
  function showRegister() {
    document.getElementById("register-form").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-toggle").classList.add("active");
    document.getElementById("login-toggle").classList.remove("active");
  }
  
  // Handle form submissions
  function handleLogin(event) {
    event.preventDefault();
    alert("Login successful! Redirecting to the quiz...");
    // Add actual login logic here
  }
  
  function handleRegister(event) {
    event.preventDefault();
    alert("Registration successful! You can now log in.");
    // Add actual registration logic here
  }
  