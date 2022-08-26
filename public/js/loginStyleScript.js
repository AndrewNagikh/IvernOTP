const container = document.querySelector('.container');
const singUpForm = document.getElementById('singUp');
const singInForm = document.getElementById('singIn');

function toggleForm() {
  container.classList.toggle('active');
}

container.addEventListener('click', (event) => {
  if (event.target.className === 'href') {
    toggleForm();
  }
});

singUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const login = event.target.login_singUp.value;
  const email = event.target.email_singUp.value;
  const password = event.target.password_singUp.value;
  const singUpData = {
    login,
    email,
    password,
  };
  if (login && email && password) {
    const registration = await fetch('/auth/regisration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(singUpData),
    });
    if (registration.status === 200) {
      window.location.assign('/home');
    }
    if (registration.status === 400) {
      alert('Ошибка!\nПароль должен состоять минимум из одной буквы верхнего и нижнего регистра, цифры, а также быть не короче 6 символов.');
      event.target.password_singUp.value = '';
    }
    if (registration.status === 500) {
      alert('This login or email is already in use :(');
      event.target.login_singUp.value = '';
      event.target.email_singUp.value = '';
      event.target.password_singUp.value = '';
    }
  } else {
    alert('Please, type login, email, and password for registration');
    event.target.login.value = '';
    event.target.email.value = '';
    event.target.password.value = '';
  }
});

singInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const login = event.target.login_singIn.value;
  const password = event.target.password_singIn.value;
  const singInData = {
    login,
    password,
  };
  const singIn = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(singInData),
  });
  if (singIn.status === 200) {
    window.location.assign('/home');
  }
  if (singIn.status === 401) {
    alert('Wrong password');
  }
  if (singIn.status === 500) {
    alert('This login does not exist');
  }
});
