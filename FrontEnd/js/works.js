// On récupère les works depuis l'API
    const reponse = await fetch ("http://localhost:5678/api/works");
    const works = await reponse.json();

export function getWorks (works) {
        // On sélectionne la div dans laquelle injecter les travaux
        const gallery = document.querySelector(".gallery");
        // Vide d'abord
        gallery.innerHTML = ''
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Création de la balise qui acceuillera un travail
        const figureElement = document.createElement("figure");
        figureElement.dataset.id = figure.id
        // Création des balises img et figcaption
        const imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = figure.title;


        // On rattache les balises aux balises parents
        gallery.appendChild(figureElement);
        figureElement.appendChild(imgElement)
        figureElement.appendChild(captionElement)
    }

}

getWorks(works)