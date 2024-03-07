async function obterGatos() {
    let quantidade = 10;

    const divGatos = document.getElementById("gatos");

    divGatos.innerHTML = "";

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${quantidade}`);

    const gatos = await response.json();

    let row = Math.ceil(quantidade / 5);

    let contador = 0;

    for (i = 1; i <= row; i++) {
        const rowGatos = document.createElement("div");
        rowGatos.classList.add("row")

        for (z = 0; z < 5; z++) {
            const divImagem = document.createElement("div");

            divImagem.classList.add("div-adicionar")

            const salvarIcone = document.createElement("span");

            salvarIcone.innerText = "add";

            salvarIcone.classList.add("material-symbols-rounded", "icone");

            salvarIcone.onclick = function (e) {
                const listaImgs = JSON.parse(localStorage.getItem("gatos"))
                if (listaImgs) {
                    listaImgs.push(e.target.parentElement.firstChild.src);
                    localStorage.setItem("gatos", JSON.stringify(listaImgs));
                } else {
                    let lista = [e.target.parentElement.firstChild.src];
                    localStorage.setItem("gatos", JSON.stringify(lista));
                }
                alert("Foto salva com sucesso!")
            }

            const itemGato = document.createElement("img");
            itemGato.classList.add("imagem");

            itemGato.src = gatos[contador].url;

            divImagem.append(itemGato, salvarIcone);

            rowGatos.appendChild(divImagem);
            contador++;
        }

        divGatos.appendChild(rowGatos);
    }
}

function favoritos() {
    const divGatos = document.getElementById("gatos");

    divGatos.innerHTML = "";

    const gatos = JSON.parse(localStorage.getItem("gatos"));

    let row = Math.ceil(gatos.length / 5);

    let contador = 0;

    for (i = 1; i <= row; i++) {
        const rowGatos = document.createElement("div");
        rowGatos.classList.add("row")

        for (z = 0; z < 5; z++) {
            const divImagem = document.createElement("div");

            divImagem.classList.add("div-adicionar")

            const salvarIcone = document.createElement("span");

            salvarIcone.innerText = "delete";

            salvarIcone.classList.add("material-symbols-rounded", "icone");

            salvarIcone.onclick = function (e) {
                const index = gatos.findIndex(x => x === e.target.parentElement.firstChild.src)

                gatos.splice(index, 1)

                localStorage.setItem("gatos", JSON.stringify(gatos))

                favoritos();
            }

            const itemGato = document.createElement("img");
            itemGato.classList.add("imagem");

            itemGato.src = gatos[contador] || "";

            divImagem.append(itemGato, salvarIcone);

            rowGatos.appendChild(divImagem);
            contador++;
        }

        divGatos.appendChild(rowGatos);
    }
}

window.addEventListener('load', function () {
    if (this.location.pathname === "/lista.html") {
        favoritos();
    } else {
        obterGatos();
    }
})