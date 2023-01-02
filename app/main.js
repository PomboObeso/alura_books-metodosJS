let livros = []

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

getLivrosAPI();

const elementoLivros = document.getElementById('livros');

const btns = document.querySelectorAll('.btn');

btns.forEach(btn => btn.addEventListener('click', filtrarLivros));

let btnOrdenacao = document.getElementById('btnOrdenarPorPreco');
btnOrdenacao.addEventListener('click', ordenarPreco);

const livrosTotalDisponiveis = document.getElementById('valor_total_livros_disponiveis')

function ordenarPreco() {
    let livrosOrdenados = livros.sort((a,b) => a.preco - b.preco);
    mostrarNaTela(livrosOrdenados);
}

function filtrarLivros() {
    const btn = document.getElementById(this.id);
    const categoria = btn.value;
    let livrosFiltrados = categoria == 'disponivel' ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria == categoria);
    mostrarNaTela(livrosFiltrados);
    if(categoria == 'disponivel') {
        const valorTotalDisponivel = calcularValorTotalDisponivel(livrosFiltrados);
        exibirValorTotal(valorTotalDisponivel);
    }
}

function calcularValorTotalDisponivel(livros) {
    return livros.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);
}

function exibirValorTotal(valorTotal) {
    livrosTotalDisponiveis.innerHTML = `
        <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">R$ ${valorTotal}</span></p>
        </div>
    `
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
    livrosTotalDisponiveis.innerHTML = '';
    elementoLivros.innerHTML = '' 
    listaLivros.forEach(livro => {
        let disponilibilidade = verificaQuantidade(livro);
        elementoLivros.innerHTML += 
        `
            <div class="livro">
                <img class="${disponilibilidade}" src="${livro.imagem}"
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

function verificaQuantidade(livro) {
    if(livro.quantidade > 0) {
        return 'livro__imagens';
    }else {
        return 'livro__imagens indisponivel';
    }
}