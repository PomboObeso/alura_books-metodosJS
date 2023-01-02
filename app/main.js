let livros = []

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

getLivrosAPI();

const elementoLivros = document.getElementById('livros');

const btns = document.querySelectorAll('.btn');

btns.forEach(btn => btn.addEventListener('click', filtrarLivros))

function filtrarLivros() {
    const btn = document.getElementById(this.id);
    const categoria = btn.value;
    let livrosFiltrados = livros.filter(livro => livro.categoria == categoria);
    mostrarNaTela(livrosFiltrados);
}

async function getLivrosAPI() {
    const res = await fetch(endpointAPI);

    livros = await res.json();
    console.table(livros);

    let livrosDesconto = aplicarDesconto(livros);

    console.table(livrosDesconto)

    mostrarNaTela(livrosDesconto);
}

function aplicarDesconto(listaLivros) {
    const desconto = 0.3;
    let livroDesconto = listaLivros.map(livro => {
        return {...livro, preco: livro.preco -(livro.preco * desconto)}
    });

    return livroDesconto;
}

function mostrarNaTela(listaLivros) {
    elementoLivros.innerHTML = '' 
    listaLivros.forEach(livro => {
        elementoLivros.innerHTML += 
        `
            <div class="livro">
                <img class="livro__imagens" src="${livro.imagem}"
                    alt="${livro.alt}" />
                <h2 class="livro__titulo">${livro.titulo}</h2>
                <p class="livro__descricao">${livro.autor}</p>
                <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
                <div class="tags">
                    <span class="tag">${livro.categoria}</span>
                </div>
            </div>
        `
    });
}