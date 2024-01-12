// Importation de la fonction

import { getWorks } from "./works.js";

// On récupère les works depuis l'API
const reponse = await fetch ("http://localhost:5678/api/works");
const works = await reponse.json();

// Authentification
// >> Si Auth ok appel f
let Auth = window.localStorage.getItem("token")
if (Auth === null) {
// Filtre "Tous"

    const boutonTous = document.querySelector(".btn-tous");
    boutonTous.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = '';
        getWorks(works);
    });

// Filtre "Objets"

    const boutonObjets = document.querySelector(".btn-objets");
    boutonObjets.addEventListener("click", function () {
        const filtreObjets = works.filter(function (work) {
            return work.categoryId === 1
        });
        document.querySelector(".gallery").innerHTML = '';
        getWorks(filtreObjets);
    });

// Filtre "Appartements"

    const boutonAppartements = document.querySelector(".btn-appartements");
    boutonAppartements.addEventListener("click", function () {
        const filtreAppartements = works.filter(function (work) {
            return work.categoryId === 2
        });
        document.querySelector(".gallery").innerHTML = '';
        getWorks(filtreAppartements);
    })

// Filtre "Hôtels & Restaurants"

    const boutonHotelRestau = document.querySelector(".btn-hotelsetrestaurants");
    boutonHotelRestau.addEventListener("click", function () {
        const filtreHotelRestau = works.filter(function (work) {
            return work.categoryId === 3
        });
        document.querySelector(".gallery").innerHTML = '';
        getWorks(filtreHotelRestau);
    });
} else {
}
