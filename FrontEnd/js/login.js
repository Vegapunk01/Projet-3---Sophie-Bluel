// F importées

import {RemoveIfExist} from "./logged.js";
import {logout} from "./logged.js";

// Si l'user est sur la page de connexion, le bouton login devient gras
const login = document.getElementById("navlogin")
const currentPage = window.location.pathname.split('/').pop().split('.').shift();
if (currentPage === 'login') {
    login.style.fontWeight = "bold"
}
// Authentification
// >> Si Auth ok appel f
let Auth = window.localStorage.getItem("token")
if (Auth === null) {
    let form = document.querySelector(".form-login form")
    form.addEventListener("submit", (event) => {
        console.log("click")
        try {
            event.preventDefault()
            let baliseEmail = document.getElementById("email")
            let balisePassword = document.getElementById("password")
            logIn(baliseEmail.value, balisePassword.value)

        } catch (error) {
            console.log("Un erreur est survenue : " + error.message)
        }
    })
} else {
    msgAuthSuccess()
    logout()

}
// -- Fonction qui permet d'envoyer une requête API avec l'email et password -- //
// >> Message d'erreur si la combinaison est mauvaise                           //
    function logIn (email, password) {
    let user = {email: email, password: password}
    let jsonBody = JSON.stringify(user)
        fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: jsonBody,
    })
        .then(response=> response.json())
        .then(data => {
            if (data.token) {
                window.localStorage.setItem("token", data.token)
                window.location.replace("../FrontEnd/index.html")
            } else {
                msgErreur()
            }
        })
        .catch((err)=> {
        console.log(err);
    })
}
// -- Fonction qui affiche un message d'erreur si le Login n'est pas celui de Sophie -- //
function msgErreur () {
    // Appel de la fonction RemoveIfExist du message d'erreur
    RemoveIfExist(".msgError")
    // Sélection de la DIV parent
    const divForm = document.querySelector(".form-login")
    // Selection du formulaire
    let form = document.querySelector(".form-login form")
    // Création de la balise P et son ID
    const msgError = document.createElement("p")
    msgError.classList.add("msgError");
    // Modification CSS des champs EMAIL et PASSWORD
    const eError = document.getElementById("email")
    eError.style.border = "1px solid red"
    eError.style.boxShadow = "0px 0px 20px red"
    const pError = document.getElementById("password")
    pError.style.border = "1px solid red"
    pError.style.boxShadow = "0px 0px 20px red"
    msgError.style.fontSize = "20px"
    msgError.style.fontWeight = "bold"
    msgError.style.color = "red"
    msgError.style.marginTop = "15px"
    msgError.innerText = "Erreur dans l'Identifiant ou le Mot de passe";
    divForm.insertBefore(msgError, form)
    form.style.marginTop = "0px"
}
// -- Message qui s'affiche si l'utilisateur arrive à revenir à la page login.html alors qu'il est déjà connecté -- //
function msgAuthSuccess () {
    // Sélection de la SECTION LOGIN et son formulaire
    const loginForm = document.querySelector(".login")
    // Création du MSG H2 une fois connecté avec succès
    const hAuthSuccess = document.createElement("div")
    hAuthSuccess.innerHTML = "<h2>Vous êtes connecté !</h2>"
    hAuthSuccess.style.height = "300px"
    hAuthSuccess.style.marginTop = "40px"
    // Suppression de la SECTION LOGIN ---> remplacement par le MSG H2
    loginForm.replaceWith(hAuthSuccess)
}


