// Authentification
// >> Si Auth ok appel f
let Auth = window.localStorage.getItem("token")
    if (Auth === null) {
    } else {
        editBanner()
        editButton() 
        logout()
        //////////////////////////////////////////////////////////////////////////////////////
        // Au clique sur le bouton "modifier", la fonction qui génère la modale est activée //
        //////////////////////////////////////////////////////////////////////////////////////
        const btnModifier = document.getElementById("editLink")
        btnModifier.addEventListener("click", function () {
            genererationModale("Gallerie photo", "Ajouter une photo")
        })
    }
//////////////////////////////////////////////////////////////////////////////////////////
// Fonction qui remplace le bouton "login" par le bouton "logout" si token = true       //
// >> Si on clique sur le bouton "logout" le token est supprimé et l'user se déconnecte //
//////////////////////////////////////////////////////////////////////////////////////////
export function logout () {
    // Sélection du lien / nav LOGIN à remplacer
    const login = document.getElementById("navlogin")
    // Création du lien / nav LOGOUT qui remplace LOGIN en cas de TOKEN
    const logout = document.createElement("a")
    logout.innerHTML = "<a href=\"login.html\"><li>logout</li></a>"
    // Suppression du lien LOGIN ---> Remplacement par le lien LOGOUT
    login.replaceWith(logout)
    // Si on clique sur le bouton LOGOUT, cela efface le cache
    logout.addEventListener("click", function () {
        window.localStorage.removeItem("token")
    })
}
///////////////////////////////////////////////////////////
// Fonction qui crée la bannière noire si token = true  //
//////////////////////////////////////////////////////////
function editBanner () {
        // Création de la bannière noire
    const divBanner = document.createElement("div")
    divBanner.style.position = "relative"
    divBanner.style.width ="100vw"
    divBanner.style.height = "50px"
    divBanner.style.marginLeft = "-50vw"
    divBanner.style.left = "50%"
    divBanner.style.backgroundColor = "black"
        // Création du texte + icone dans la bannière
    const pBanner = document.createElement("p")
    pBanner.style.textAlign = "center"
    pBanner.style.color = "white"
    pBanner.style.padding = "17px"
    pBanner.style.fontSize = "16px"
    pBanner.innerHTML = "<i class=\"fa-regular fa-pen-to-square\" style=\"color: #ffffff;\"></i>   Mode édition"
        // Selection de BODY et HEADER
    const selecBody = document.querySelector("body")
    const selecHeader = document.querySelector("header")
        // Insérer la DIV dans le body + le P dans la DIV
    selecBody.insertBefore(divBanner, selecHeader)
    divBanner.appendChild(pBanner)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction qui fait apparaître le bouton modifier à côté du titre "Mes Projets" et enlève les boutons filtres//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function editButton () {
    // Sélection la DIV filtres
    const divFiltres = document.querySelector(".btn-filtres")
    // Création d'une DIV contenant le <a> btn / lien MODIFIER
    const editLink = document.createElement("div")
    editLink.innerHTML = "<a><i class=\"fa-regular fa-pen-to-square\" style=\"color: #000000;\"></i>   modifier</a>"
    editLink.id = "editLink"
    // Remplacement de la DIV filtres par le lien MODIFIER
    divFiltres.replaceWith(editLink)
    // Création nouvelle DIV qui va inclure le H2 + le lien MODIFIER
    const divEditButton = document.createElement("div")
    divEditButton.id = "divEdit"
    // Selection titre H2 Mes Projet
    const mesProjets = document.querySelector("#portfolio h2")
    // Ajout de H2 + lien MODIFIER à l'intérieur
    divEditButton.appendChild(mesProjets)
    divEditButton.appendChild(editLink)
    // Selection de la section #portofolio où il faut inclure la nouvelle DIV EDIT BUTTON
    const sectionPortofolio = document.getElementById("portfolio")
    // Selection de la section DIV GALLERY qui doit venir après la DIV EDIT BUTTON
    const divGallery = document.querySelector(".gallery")
    // Ajout de la DIV EDIT BUTTON à l'intérieur de la SECTION PORTOFOLIO
    sectionPortofolio.insertBefore(divEditButton, divGallery)
    // Organisation des la DIV CSS STYLES
    mesProjets.style.marginBottom = "0"
    editLink.firstChild.style.textDecoration = "none"
    divEditButton.style.display = "flex"
    divEditButton.style.alignItems = "center"
    divEditButton.style.justifyContent = "center"
    divEditButton.style.margin = "50px 20px 50px 100px"
    divEditButton.style.gap = "20px"
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Cette fonction génère la modale et l'ajoute au DOM                                                                  //
// >> Selon les conditions, elle affichera la page où on peut supprimer les travaux ou celle où on ajoute des works     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function genererationModale (title, button){
    // RemoveIfExist
    RemoveIfExist(".modal")
    RemoveIfExist(".sub-content")
    RemoveIfExist(".modal-content")
    // Création des div modal et modal-content (background gris et front blanc)
    const backModal = document.createElement("div")
    backModal.className = "modal"
    const frontModal = document.createElement("div")
    frontModal.className = "modal-content"
    // DOM rattachement
    const body = document.querySelector("body")
    const main = document.querySelector("main")
    body.insertBefore(backModal, main)
    backModal.appendChild(frontModal)
    // La modale s'affiche mais tout est blanc, les div sont vides à cette étape //
    // -- Création du titre, div qui accueillera les works, xmark, arrow left, hr bar & bouton -- //
    const arrowX = document.createElement("div")
    arrowX.className = "arrow-x"
    arrowX.innerHTML = "<i class=\"fa-solid fa-arrow-left\" style=\"color: #000000;\" aria-hidden=\"true\"></i>" +
        "<i class=\"fa-solid fa-xmark\" style=\"color: #000000;\" aria-hidden=\"true\"></i>"
    frontModal.appendChild(arrowX)
    // Création d'un titre h3 éditable en param fonction
    const h3 = document.createElement("h3")
    h3.innerText = title
    frontModal.appendChild(h3)
    // Création d'une div vide qui accueillera les works ou autre
    const subContent = document.createElement("div")
    subContent.className = "sub-content"
    frontModal.appendChild(subContent)
    // Création d'une barre hr
    const hr = document.createElement("hr")
    frontModal.appendChild(hr)
    // Création d'un bouton (en bas) éditable "ajout", "valider",... param fonction
    const divbtnAdd = document.createElement("div")
    divbtnAdd.innerHTML = "<button name='addwork' form='post-form' type='submit'>"+button+"</button>"
    divbtnAdd.className = "btn-add"
    frontModal.appendChild(divbtnAdd)
    // -- Si on est sur la première page "Gallerie", appel f getModal & la arrow left disparait -- //
    if (title === "Gallerie photo") {
        getModalfromHomePage()
        arrowX.querySelector(".fa-arrow-left").style.display = "none"
        arrowX.style.flexDirection = "row-reverse"
        // -- Cliquer sur le bouton "Ajouter une photo" génère la deuxième page -- //
        const btnAdd = document.querySelector(".btn-add button")
        btnAdd.addEventListener("click", function (){
            genererationModale("Ajout photo", "Valider")
        })
    } else {
    }
    // -- Si on est sur la deuxième page, appel f postWorks & la arrow left précédent fonctionne -- //
    if (title === "Ajout photo") {
        postWorks()
        arrowX.querySelector(".fa-arrow-left").addEventListener("click", function () {
            genererationModale("Gallerie photo", "Ajouter une photo")
        })
    } else {
    }
    // -- Quitter la modale avec un clique sur la zone grise -- //
    backModal.onclick = function (e) {
        if (e.target === backModal) {
            backModal.remove()
        } else {
        }
    }
    // -- Quitter la modale avec un clique sur la croix -- //
    const xmark = document.querySelector(".fa-xmark")
    xmark.addEventListener("click", function (){
        backModal.remove()
    })

}
//__________________________________________________________________________________________//
//-- Fonction qui supprime la div contenant la gallerie afin d'éviter de la générer encore--//
//------------------------------------------------------------------------------------------//
export function RemoveIfExist (id) {
    let element = document.querySelector(id)
    if (element) {
        element.remove()
    }
}
//------------------------------------------------------------//
// Fonction qui génère la gallerie à l'intérieur de la modale //
// >> Première page                                           //
//------------------------------------------------------------//
function getModalfromHomePage() {
    // Sélectionne la DIV où injecter les travaux //
    const subContent = document.querySelector(".sub-content")
    // Les vider d'abord
    subContent.innerHTML = ''
     // Div Gallery d'où récupérer l'ensemble des figure
    const divGallery = document.querySelector(".gallery")
    // Parcourir l'ensemble des figures de la gallerie //
    for (let i = 0; i < divGallery.children.length; i++) {
        const miniFigure = divGallery.children[i]
        // Création de la balise figure qui acceuillera un travail dans la modale
        const minifigureElement = document.createElement("figure");
        minifigureElement.dataset.id = miniFigure.dataset.id
        // Création des balises img
        const imgElement = document.createElement("img");
        imgElement.src = miniFigure.firstElementChild.src;
        // Création de l'icone "poubelle"
        const divBin = document.createElement("div")
        divBin.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>"
        divBin.className = "bin"
        // On rattache les balises aux balises parents
        subContent.appendChild(minifigureElement);
        minifigureElement.appendChild(imgElement)
        minifigureElement.appendChild(divBin)
        // -- Si clique sur corbeille / bin = suppression du work en question depuis le Backend--//
        divBin.addEventListener("click",async function (e){
            e.preventDefault()
            e.stopPropagation()
            let response = await fetch(`http://localhost:5678/api/works/${miniFigure.dataset.id}`, {
                method : "DELETE",
                headers : {
                    accept: "*/*",
                    Authorization: `Bearer ${Auth}`,
                },
            })
            // -- Si work supprime du backend, suppression du work en question de tout le DOM (gallerie et modal) -- //
            if (response.ok) {
                minifigureElement.parentNode.removeChild(minifigureElement)
                function supprimerElementParSrc(srcValue) {
                    let elementavecSrc = document.querySelectorAll('[src="' + srcValue + '"]')
                    elementavecSrc.forEach(function (element){
                        const parent = element.parentNode
                        if (parent) {
                        parent.parentNode.removeChild(parent)
                                    }
                    })
                }
                supprimerElementParSrc(imgElement.src)
            } else {
                console.log("pb")
            }
        })
    }
}
//--------------------------------------------------------------//
// Fonction qui génère le formulaire à l'intérieur de la modale //
// >> Deuxième page                                             //
//--------------------------------------------------------------//
function postWorks () {
    // Selection div sub-content où tout intégrer
    const subContent = document.querySelector(".sub-content")
    // -- PARTIE GRISE -- //
    // Création de la div 'grey'
    const divGrey = document.createElement("div")
    divGrey.className = "div-grey"
    // Création de l'icone
    const iGrey = document.createElement("div")
    iGrey.className = "i-grey"
    iGrey.innerHTML = "<i class=\"fa-regular fa-image\" style=\"color: #b9c5cc;\"></i>"
    // Création bouton + Ajouter photo
    const btnGrey = document.createElement("div")
    btnGrey.className = "btn-grey"
    btnGrey.innerHTML = "<label for=\"input-file\">+ Ajouter photo</label>\n" +
                        "<input name=\"image\" form=\"post-form\" type=\"file\" accept=\"image/jpeg, image/jpg, image/png\" id=\"input-file\">"
    const pGrey = document.createElement("p")
    pGrey.innerText = "jpg, png : 4mo max"
    // DOM Rattachement
    subContent.appendChild(divGrey)
    divGrey.appendChild(iGrey)
    divGrey.appendChild(btnGrey)
    divGrey.appendChild(pGrey)
    // -- PARTIE FORMULAIRE -- //
    // Création de la div formulaire
    const divForm = document.createElement("div")
    divForm.className = "div-form"
    divForm.innerHTML = "<form id=\"post-form\" action=\"#\" method=\"post\">\n" +
        "\t\t\t<label for=\"title\">Titre</label>\n" +
        "\t\t\t<input type=\"text\" name=\"title\" id=\"title\" required>\n" +
        "<label for=\"category\">Catégorie</label>" +
        "<select id=\"category\" name=\"category\" required></select>\n" +
        "\t\t</form>"
    // DOM Rattachement
    subContent.appendChild(divForm)
    // CSS du subcontent qui va changer sur la deuxième page >> btn valider submit disabled
    subContent.style.display = "flex"
    subContent.style.flexDirection = "column"
    subContent.style.width = "100%"
    subContent.style.alignItems = "normal"
    subContent.style.paddingTop = "20px"
    subContent.style.paddingBottom = "20px"
    divGrey.style.marginBottom = "20px"
    const btnAddPost = document.querySelector(".btn-add")
    btnAddPost.className = "btn-post"
    const btn = document.querySelector(".btn-post button")
    btn.setAttribute("disabled","")
    // -- Paramétrage du bouton "+ Ajouter photo" (taille max, param input, affichage de l'image, enable btn "valider"..) -- //
    let inputFile = document.getElementById("input-file")
        inputFile.onchange = function () {
            const sizeLimit = 4 * 1024 * 1024;
            if (inputFile.files[0] && inputFile.files[0].size > sizeLimit) {
                pGrey.style.color = "red"
                pGrey.style.backgroundColor = "yellow"
                pGrey.style.fontWeight = "bold"
            } else {
                divGrey.innerHTML = ''
                let uppicGrey = document.createElement("img")
                uppicGrey.id = "up-img"
                uppicGrey.src = URL.createObjectURL(inputFile.files[0])
                divGrey.appendChild(uppicGrey)
                divGrey.style.padding = "0px"
                uppicGrey.style.width = "147px"
                btn.removeAttribute("disabled")
                btn.style.backgroundColor = "#1D6154"
            }
        }
    // -- Cliquer sur le champ "Catégorie" appel la f getCategories -- //
    const select = document.getElementById("category")
    select.onclick = getCategories
    // -- Au clique "Submit" / Valider, envoyer le formulaire au backend --- //
    let postForm = document.getElementById("post-form")
    postForm.addEventListener("submit", function (e) {
        e.preventDefault()
        let formData = new FormData(postForm)
        formData.append("image", inputFile.files[0]) // title, category, sont déjà append par défaut car le name dans le label est déjà défini
        // -- Appel de la f envoyerDonnees -- //
        envoyerDonnees(formData)
    })
}
//---------------------------------------------------------//
// Envoi une requete POST à l'API avec la formData en body //
// >> Si réponse ok, afficher msg succès                   //
//---------------------------------------------------------//
function envoyerDonnees(formData) {
    fetch(`http://localhost:5678/api/works`,{
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${Auth}`
                }
    })
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            // Récupérer l'URL et le titre de l'image depuis la réponse du serveur
            let imgUrl = data.imageUrl
            let title = data.title
            // Créer dynamiquement un élément img, figure, figcaption dans le DOM
            let figureElement = document.createElement("figure")
            let imgElement = document.createElement("img")
            let captionElement = document.createElement("figcaption")
            // Relier les id, ça va servir à la suppression et à générer les pages galleries / modale
            figureElement.dataset.id = data.id
            imgElement.src = imgUrl
            captionElement.innerText = title
            // Ajouter l'élément img et figure au corps du document
            const divGallery = document.querySelector(".gallery")
            divGallery.appendChild(figureElement)
            figureElement.appendChild(imgElement)
            figureElement.appendChild(captionElement)
            // Appel f qui affiche icone sucess check pendant 1 sec avant d'atterir page accueil
            afficherIconeAjoutSucces()
            setTimeout(()=> document.querySelector(".modal").remove(), 1000)
        })
        .catch(error => console.error("Erreur lors de l'ajout de l'image :", error))
}
//-----------------------------------------------------------------------------------------------------//
// -- Fonction qui affiche une icone check vert afin d'indiquer que l'ajout du work a été un succès -- //
// ----------------------------------------------------------------------------------------------------//
function afficherIconeAjoutSucces () {
        const backModal = document.querySelector(".modal")
        const frontModal = document.querySelector(".modal-content")
        const circle = document.createElement("div")
        circle.className = "circle"
        const iconCheck = document.createElement("span")
        iconCheck.innerHTML = "<i class=\"fa-solid fa-check\" style=\"color: #63E6BE;\"></i>"
        circle.appendChild(iconCheck)
        frontModal.replaceWith(circle)
        backModal.style.display = "flex"
        backModal.style.justifyContent = "center"
        backModal.style.alignItems = "center"
}
//-----------------------------------------------------------------------------------//
//-- Fonction qui récupère les catérgories depuis l'API pour notre liste déroulante --//
//-----------------------------------------------------------------------------------//
// On récupère les categories depuis l'API
const response = await fetch("http://localhost:5678/api/categories");
const categorie = await response.json();
function getCategories () {
    // Pour éviter de créer des balises à l'infini
    const option = document.querySelector(".option")
    if (option === null) {
        // On sélectionne la div où afficher nos catégories
        const baliseSelect = document.getElementById("category")
        // On lance notre boucle en parcourant les catégories récupérées
        for (let i=0; i<categorie.length; i++) {
            const cat = categorie[i];
            // Création balise qui va accueillir nos cat
            const option = document.createElement("option")
            option.className= "option"
            option.value = cat.id
            option.innerText = cat.name
            // Rattachement au DOM
            baliseSelect.appendChild(option)
        }
    } else {
    }
}