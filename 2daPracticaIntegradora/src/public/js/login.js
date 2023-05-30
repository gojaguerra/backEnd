let nIntervId;

function delayNavigateOk() {
    if (!nIntervId) {
        nIntervId = setInterval(navigateOk, 2000);
    };
};

function navigateOk() {
    window.location.replace('/');
};

const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: true,
            })
            delayNavigateOk();
            //window.location.replace('/');
        }else{
            if (result.status === 400) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Los datos ingresados son incorrectos, vuelva a intentarlo o registrese',
                    showConfirmButton: true,
                })
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Hay datos incompletos, vuelva a intentarlo',
                    showConfirmButton: true,
                })                
            }    
        }
    });
});

/* Swal.fire({
    title: 'Login Form',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Sign in',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    console.log(result);
      const obj = { user: result.value.login, password: result.value.password };
      console.log(obj);
      fetch('http://localhost:8080/login/', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
              'Content-Type': 'application/json'
              }
          })
    
    .then((result2) => {
        if (result2.status === 200) {
        Swal.fire({
            title: 'Logueado',
            icon: 'success'
        })
            window.location.replace('/home');
        } else {
            window.location.replace('/');
        }
    })
  }) */