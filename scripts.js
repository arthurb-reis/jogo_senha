// Script JavaScript externo

var senha = ['1','2','2','3'];
var tentativa = [null, null, null, null];
var tentativaAtual = 1; // Variável para armazenar o número da tentativa atual
var emJogo = true;

var bolas;
const teclas = document.querySelectorAll('.tecla');
const limpar = document.querySelectorAll('.limpar');
const bs = document.querySelectorAll('.bs');

var bolaSelecionada = null; // Variável para armazenar a bola selecionada

var ok = document.getElementById("try");
ok.addEventListener("click", verificar);

function atribuirBolas(tentativaAtual) {
    bolas = document.querySelectorAll('.jogada' + tentativaAtual + ' .bola');
    bolas.forEach((bola, index) => {
      bola.addEventListener('click', () => {
        if(bolaSelecionada !== null){
            zeraSelecao();
        }
        seleciona(index);
      });
    });
    seleciona(0);
    tentativa = [null, null, null, null];
}

document.addEventListener('DOMContentLoaded', function() {
  // Coloque aqui o nome da função que você quer chamar ao abrir a página
  atribuirBolas(1);
  embaralha();
  emJogo = true;
});

limpar[0].addEventListener('click', () => {
    if(!emJogo){
        mostrarMensagem("mensagem-fim");
        return;
    }
    zerarCor();
    tentativa = [null, null, null, null];
    zeraSelecao();
    seleciona(0);
});

bs[0].addEventListener('click', () => {
    if(!emJogo){
        mostrarMensagem("mensagem-fim");
        return;
    }
    if(bolaSelecionada !== null){
        if(bolaSelecionada === 0){
            del(0);
            seleciona(0);
        } else {
            if(tentativa[bolaSelecionada] !== null){
                del(bolaSelecionada);
            } else {
                var aux = bolaSelecionada;
                zeraSelecao();
                bolaSelecionada = aux - 1;
                del(bolaSelecionada);
                seleciona(bolaSelecionada);
            }
        }
    } else {
        for(var i = 3; i >= 0; i--){
            if(tentativa[i] !== null){
                del(i);
                seleciona(i);
                bolaSelecionada = i;
                break;
            }
        }
    }
});

function del(bola){
    bolas[bola].style.backgroundColor = 'grey'; 
    tentativa[bola] = null;
}

function zerarCor() {
    bolas.forEach((bola, index) => {
        bola.style.backgroundColor = 'grey';  
    });
};

// Adicionando observador de eventos para cada classe de bola do teclado
teclas.forEach((tecla, index) => {
  tecla.addEventListener('click', () => {
    let corSelecionada = ''; // Variável para armazenar a cor selecionada
    if(!emJogo){
        mostrarMensagem("mensagem-fim");
        return;
    }
    corSelecionada = getComputedStyle(tecla).backgroundColor; // Atualizando a cor selecionada com a cor da tecla clicada
    if(bolaSelecionada == null){
        if(!tentativa.includes(null)){
            mostrarMensagem("mensagem-ok");
            ok.style.borderColor = 'red';
            setTimeout(function() {
                ok.style.borderColor = 'transparent';
            }, 1000);
        } else{
            mostrarMensagem("mensagem-selecionar");
        }
    } else {
        bolas[bolaSelecionada].style.backgroundColor = corSelecionada;
        tentativa[bolaSelecionada] = retornaCor(corSelecionada);
        for(var i = bolaSelecionada + 1; i < 4; i++){
            if(tentativa[i] === null){
                seleciona(i);
                return;
            }
        }
        for(var i = 0; i <= bolaSelecionada; i++){
            if(tentativa[i] === null){
                seleciona(i);
                return;
            }
        }
        seleciona(5);
    }
  });
});

/*document.body.addEventListener('click', (event) => {
  // Verifica se o clique ocorreu fora das bolas e teclas
  if (emJogo && !Array.from(bolas).includes(event.target) && !event.target.closest('.teclado-container') && !event.target.closest('.submit-container')) {
    zeraSelecao();
  }
});*/

function zeraSelecao(){
    if(bolaSelecionada !== null && emJogo){
        //var corRGBA = getComputedStyle(bolas[bolaSelecionada]).backgroundColor;
        bolas[bolaSelecionada].style.borderColor = 'transparent';
        /*if (corRGBA.includes('rgba')) {
            var corRGB = corRGBA.replace(/,\s*\d+(\.\d+)?\s*\)/, ')').replace('rgba', 'rgb');
            bolas[bolaSelecionada].style.backgroundColor = corRGB;
        } else {
            bolas[bolaSelecionada].style.backgroundColor = corRGBA;
        }*/
        bolaSelecionada = null;
    }
}

function seleciona(index){
    if(!emJogo)
        return;
    if(index < 4){
        zeraSelecao();
        //var corRGB = getComputedStyle(bolas[index]).backgroundColor;
        bolas[index].style.borderColor = 'white';
        /*if(!corRGB.includes('rgba')){
            var indiceUltimoNumero = corRGB.lastIndexOf(')'); // Encontra o índice da última vírgula
            var corRGBA = corRGB.slice(0, indiceUltimoNumero) + ', 0.6' + corRGB.slice(indiceUltimoNumero);
            // Torna a bola clicada um pouco mais clara
            bolas[index].style.backgroundColor = corRGBA.replace('rgb', 'rgba');
        }*/
        bolaSelecionada = index; // Armazena o índice da bola selecionada
    } else {
        zeraSelecao();
    }
}

function retornaCor(RGB){
    if(RGB === 'rgb(0, 9, 56)'){
        return '0';
    } else if(RGB === 'rgb(163, 119, 0)'){
        return '1';
    } else if(RGB === 'rgb(0, 71, 5)'){
        return '2';
    } else if(RGB === 'rgb(178, 47, 14)'){
        return '3';
    } else if(RGB === 'rgb(71, 11, 21)'){
        return '4';
    }
    return null;
}

function verificar() {
    if(!emJogo){
        mostrarMensagem("mensagem-fim");
        return;
    }
    for (let i = 0; i < tentativa.length; i++) {
        if (tentativa[i] === null) {
            mostrarMensagem("mensagem-try");
            return;
        }
    }

    // Declarar variáveis:
    var vetorVerificacaoSenha = [0, 0, 0, 0];
    var vermelhos = 0;
    var brancos = 0;

    //Inicia teste:
    for (var i = 0; i < tentativa.length; i++) {
        if(tentativa[i] === senha[i]){
            vermelhos++;
            vetorVerificacaoSenha[i] = 1;
        }
    }

    for (var i = 0; i < tentativa.length; i++) {
        if(vetorVerificacaoSenha[i] === 1)
            continue;
        for(var j = 0; j < senha.length; j++){
            if(vetorVerificacaoSenha[j] === 0 && tentativa[i] === senha[j] && i !== j){
                brancos++;
                vetorVerificacaoSenha[j] = 2;
                break;
            }
        }
    }

    pintaResposta(vermelhos, brancos);

    if(vermelhos >= 4){
        mostrarMensagemFim('#mensagemModalWin');
        emJogo = false;
    } else {
        tentativaAtual++;
        tentativa = [null, null, null, null];
        if(tentativaAtual >= 11){
            mostrarMensagemFim('#mensagemModal');
            emJogo = false;
            pintaSenhaCorreta();
            mostrarMensagemCorreta();
        }
    }
    
    zeraSelecao();
    bolas = null;
    atribuirBolas(tentativaAtual);
}


function pintaResposta(V, B){
    const bolasr = document.querySelectorAll('.jogada' + tentativaAtual + ' .bolar');
    var i = 0;
    for(; i < V; i++)
        bolasr[i].style.backgroundColor = '#cf0c0c';
    for(; i < V+B; i++)
        bolasr[i].style.backgroundColor = '#F5F5F5';
    for(; i < 4; i++)
        bolasr[i].style.backgroundColor = 'black';
}

function embaralha(){
    senha = [];
    Math.random();
    // Preenche o vetor senha com elementos aleatórios
    for (var i = 0; i < 4; i++) {
        var valorAleatorio;
        
        // Garante que o valor aleatório não seja igual aos últimos dois elementos
        do {
            valorAleatorio = Math.floor(Math.random() * 5).toString(); // Gera um valor aleatório entre 0 e 4
        } while (!(contarOcorrencias(valorAleatorio) < 2));
        
        senha.push(valorAleatorio);
    }
}

function contarOcorrencias(valor) {
    var contador = 0;
    for(var i = 0; i < senha.length; i++){
        if(senha[i] === valor)
            contador++;
    }
    return contador;
};


function mostrarMensagem(mensagem) {
    var divMensagem = document.getElementById(mensagem);
    divMensagem.style.display = "block"; // Garante que o elemento esteja visível

    // Após um pequeno intervalo, alteramos a opacidade para 0, dando a sensação de desaparecimento suave
    setTimeout(function() {
        divMensagem.style.opacity = "0"; // Diminui a opacidade
        // Após a transição, definimos a propriedade de exibição para "none" para esconder completamente o elemento
        setTimeout(function() {
            divMensagem.style.display = "none";
        }, 1000); // Tempo para a transição terminar
    }, 1500); // Tempo para a mensagem ser exibida
    divMensagem.style.opacity = "1";
}

function mostrarMensagemCorreta() {
    var divMensagem = document.getElementById('mensagem-correta');
    divMensagem.style.display = "block"; // Garante que o elemento esteja visível
    divMensagem.style.opacity = "1"; // Define a opacidade para 1, tornando o elemento completamente visível
}

function mostrarMensagemFim(mensagem) {
    $(mensagem).modal({ backdrop: 'static', keyboard: false }); // Mostra o modal sem permitir fechar com clique fora ou com o teclado
}


function pintaSenhaCorreta() {
    for(var i = 0; i < 4; i++){
        var RGB = null;
        var bolaC = document.querySelectorAll('.bolac' + i);
        if(senha[i] === '0'){
            RGB = 'rgb(0, 9, 56)';
        } if(senha[i] === '1'){
            RGB = 'rgb(163, 119, 0)';
        } else if(senha[i] === '2'){
            RGB = 'rgb(0, 71, 5)'
        } else if(senha[i] === '3'){
            RGB = 'rgb(178, 47, 14)';
        } else if(senha[i] === '4'){
            RGB = 'rgb(71, 11, 21)';
        }
        bolaC[0].style.backgroundColor = RGB;
    }
}
