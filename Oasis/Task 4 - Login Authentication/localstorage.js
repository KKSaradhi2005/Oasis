document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  console.log('Registering user:', username);

  const hashedPassword = await hashPassword(password);

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.username === username);

  if (userExists) {
      alert('Username already exists.');
      console.log('Username already exists.');
  } else {
      users.push({ username, password: hashedPassword });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      console.log('Registration successful!');
      window.location.href = 'index.html';
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


function logOut() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}




