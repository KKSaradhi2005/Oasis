document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    console.log('Logging in user:', username);
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);
  
    if (user && await comparePassword(password, user.password)) {
        alert('Login successful!');
        console.log('Login successful!');
        localStorage.setItem('token', 'your-generated-token'); 
        window.location.href = 'secured.html';
    } else {
        alert('Invalid username or password.');
        console.log('Invalid username or password.');
    }
  });
  

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
  }

  document.querySelectorAll('.showHidePw').forEach(icon => {
    icon.addEventListener('click', () => {
      const passwordField = icon.previousElementSibling;
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.replace('uil-eye-slash', 'uil-eye');
      } else {
        passwordField.type = 'password';
        icon.classList.replace('uil-eye', 'uil-eye-slash');
      }
    });
  });
  

  async function comparePassword(inputPassword, storedHashedPassword) {
    const hashedInputPassword = await hashPassword(inputPassword);
    return hashedInputPassword === storedHashedPassword;
  }
  
 
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('secured.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'index.html';
        }
    }
  });
  
  
  function logOut() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  }
  
 