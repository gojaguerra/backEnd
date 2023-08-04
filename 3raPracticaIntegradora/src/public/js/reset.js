let nIntervId;

// Botón para ir al HOME
const goHome = document.getElementById('goHome')
if(goHome) {
    goHome.addEventListener('click', (event) => {
        /* window.location= "/home"; */
        window.location= "/";
    });
};

function delayNavigateOk() {
    if (!nIntervId) {
        nIntervId = setInterval(navigateOk, 2000);
    };
};

function navigateOk() {
    window.location.replace('/');
};

const form = document.getElementById('resetForm');

if (form) {
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log(obj);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Enviando correo...',
        showConfirmButton: true,
      })
    fetch('/api/sessions/password-link', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se envio un email de reset!',
                showConfirmButton: true,
              })
            delayNavigateOk();
        }else{
            if (result.status === 400) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'El usuario no existe, por favor registrese',
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
};