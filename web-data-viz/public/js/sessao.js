// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var bio = sessionStorage.BIO_USUARIO;

    var n_user = document.getElementById("n_user");
    var bio_user = document.getElementById("bio_user")

    if (email != null && nome != null) {
        n_user.innerHTML = nome;
        bio_user.innerHTML = bio;
    } else {
        window.location = "login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}
