import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Verifica se o botão "Iniciar" foi encontrado corretamente
console.log("Botão iniciar encontrado:", botaoIniciar);

// Adiciona o evento de clique ao botão "Iniciar"
botaoIniciar.addEventListener('click', iniciaJogo);

// Verifica se o evento foi adicionado ao botão "Jogar novamente"
botaoJogarNovamente.addEventListener("click", jogaNovamente);

function iniciaJogo() {
    console.log("Iniciando o jogo...");
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = 'none';  // Oculta a tela inicial
    caixaPerguntas.classList.add("mostrar");  // Exibe a caixa de perguntas
    caixaAlternativas.classList.add("mostrar");  // Exibe a caixa de alternativas
    caixaResultado.classList.remove("mostrar");  // Esconde a caixa de resultado
    mostraPergunta();
}

function mostraPergunta() {
    console.log("Mostrando pergunta:", atual);
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    console.log("Alternativa selecionada:", opcaoSelecionada);
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacoes + " ";
    
    // Verifica se existe uma próxima pergunta. Se não existir, mostra o resultado.
    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }
    mostraPergunta();
}

function mostraResultado() {
    console.log("Mostrando resultado final.");
    caixaPerguntas.textContent = `Em 2049, ${nome}, suas decisões moldaram o futuro da Terra...`;
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";  // Limpa as alternativas
    caixaPerguntas.classList.remove("mostrar");  // Oculta a caixa de perguntas
    caixaAlternativas.classList.remove("mostrar");  // Oculta a caixa de alternativas
    caixaResultado.classList.add("mostrar");  // Exibe a caixa de resultado
}

function jogaNovamente() {
    console.log("Reiniciando o jogo...");
    atual = 0;  // Reinicia o índice das perguntas
    historiaFinal = "";  // Limpa o histórico das respostas
    caixaResultado.classList.remove("mostrar");  // Esconde o resultado
    telaInicial.style.display = 'block';  // Volta para a tela inicial
}

function substituiNome() {
    // Substitui a palavra 'você' pelo nome aleatório escolhido
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/g, nome);
    }
}

substituiNome();  // Executa a substituição no início do jogo