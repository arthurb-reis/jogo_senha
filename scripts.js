// Script JavaScript externo

var senha = ['1','2','2','3'];
var tentativa = [null, null, null, null];
var tentativaAtual = 1; // Variável para armazenar o número da tentativa atual

var bolas = document.querySelectorAll('.jogada1 .bola');
const teclas = document.querySelectorAll('.tecla');

let corSelecionada = ''; // Variável para armazenar a cor selecionada
var bolaSelecionada = null; // Variável para armazenar a bola selecionada

function atribuirBolas(tentativaAtual) {
    bolas = document.querySelectorAll('.jogada' + tentativaAtual + ' .bola');
    bolas.forEach((bola, index) => {
      bola.addEventListener('click', () => {
        if(bolaSelecionada == index)
            zeraSelecao();
        else if(bolaSelecionada != null){
            zeraSelecao();
            seleciona(index);
        } else
            seleciona(index);
      });
    });
    seleciona(0);
    tentativa = [null, null, null, null];
}

document.addEventListener('DOMContentLoaded', function() {
  // Coloque aqui o nome da função que você quer chamar ao abrir a página
  atribuirBolas(1);
  
});

// Adicionando observador de eventos para cada classe de bola do teclado
teclas.forEach((tecla, index) => {
  tecla.addEventListener('click', () => {
    corSelecionada = getComputedStyle(tecla).backgroundColor; // Atualizando a cor selecionada com a cor da tecla clicada
    if(bolaSelecionada == null){
        console.log("Selecione uma bola");
    } else {
        bolas[bolaSelecionada].style.backgroundColor = corSelecionada;
        tentativa[bolaSelecionada] = retornaCor(corSelecionada);
        seleciona(bolaSelecionada + 1);
    }
  });
});

document.body.addEventListener('click', (event) => {
  // Verifica se o clique ocorreu fora das bolas e teclas
  if (!event.target.closest('.jogada' + tentativaAtual + ' .bola') && !event.target.closest('.teclado-container') && !event.target.closest('.submit-container')) {
    zeraSelecao();
  }
});

function zeraSelecao(){
    if(bolaSelecionada != null){
        var corRGBA = getComputedStyle(bolas[bolaSelecionada]).backgroundColor;
        var corRGB = corRGBA.replace(/,\s*\d+(\.\d+)?\s*\)/, ')');
        bolas[bolaSelecionada].style.backgroundColor = corRGB;
        bolaSelecionada = null;
    }
}

function seleciona(index){
    if(index < 4){
        var corRGB = getComputedStyle(bolas[index]).backgroundColor;
        var indiceUltimoNumero = corRGB.lastIndexOf(')'); // Encontra o índice da última vírgula
        var corRGBA = corRGB.slice(0, indiceUltimoNumero) + ', 0.6' + corRGB.slice(indiceUltimoNumero);

        // Torna a bola clicada um pouco mais clara
        bolas[index].style.backgroundColor = corRGBA;
        bolaSelecionada = index; // Armazena o índice da bola selecionada
    } else {
        bolaSelecionada = null;
    }
}

function retornaCor(RGB){
    if(RGB === 'rgb(255, 0, 0)'){
        return '0';
    } else if(RGB === 'rgb(0, 128, 0)'){
        return '1';
    } else if(RGB === 'rgb(0, 0, 255)'){
        return '2';
    } else if(RGB === 'rgb(255, 255, 0)'){
        return '3';
    } else if(RGB === 'rgb(255, 165, 0)'){
        return '4';
    }
    return null;
}

document.getElementById("try").addEventListener("click", verificar);

function verificar() {
    for (let i = 0; i < tentativa.length; i++) {
        if (tentativa[i] === null) {
            console.log("Selecione uma bola");

            return;
        }
    }

    // Declarar variáveis:
    var vetorVerificacaoTent = [0, 0, 0, 0];
    var vetorVerificacaoSenha = [0, 0, 0, 0];
    var vermelhos = 0;
    var brancos = 0;

    //Inicia teste:
    for (var i = 0; i < tentativa.length; i++) {
        if(tentativa[i] === senha[i]){
            vermelhos++;
            vetorVerificacaoTent[i] = 1;
            vetorVerificacaoSenha[i] = 1;
        }
    }

    for (var i = 0; i < senha.length; i++) {
        if(vetorVerificacaoSenha[i] === 0){
            for(var j = 0; j < tentativa.length; j++)
                if(vetorVerificacaoTent[j] == 0 && tentativa[j] === senha[i]){
                    vetorVerificacaoSenha[i] = 2;
                    vetorVerificacaoTent[j] = 2;
                    brancos++;
                }
        }
    }

    pintaResposta(vermelhos, brancos);

    if(vermelhos >= 4)
        console.log("Ganhou");

    tentativaAtual++;
    if(tentativaAtual >= 11)
        console.log("Perdeu");
    zeraSelecao();
    atribuirBolas(tentativaAtual);
}


function pintaResposta(V, B){
    const bolasr = document.querySelectorAll('.jogada' + tentativaAtual + ' .bolar');
    var i = 0;
    for(; i < V; i++)
        bolasr[i].style.backgroundColor = 'red';
    for(; i < V+B; i++)
        bolasr[i].style.backgroundColor = 'white';
    for(; i < 4; i++)
        bolasr[i].style.backgroundColor = 'black';
}
