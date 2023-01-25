/*
const listaGifs=[
    './img/edwardelric.gif', './img/joey.gif', './img/levi.gif', 
    './img/naruto.gif', './img/nightking.gif', './img/queen.gif', 
    './img/witcher.gif']
*/

const listaGifs=[
    './img/bobrossparrot.gif', './img/explodyparrot.gif', './img/fiestaparrot.gif', 
    './img/metalparrot.gif', './img/revertitparrot.gif', './img/tripletsparrot.gif', 
    './img/unicornparrot.gif'];

const listaGifs2=[];
let numeroCartas;

let cartasViradas=0;
let quantidadeDeJogadas=0;
let quantidadeDeAcertos=0;
let viradasRecentementeFrente = [];
let viradasRecentementeVerso = [];

function iniciar(){
    numeroCartas = prompt("Informe a quantidade de cartas: ");
    while(numeroCartas%2!==0 || numeroCartas<4 || numeroCartas>14){
        alert("Quantidade informada inválida, por favor digite um novo valor: ");
        numeroCartas = prompt("Quantidade de cartas: ");
    }
    criarBaralho();
}
iniciar();

function comparador() { 
    return Math.random() - 0.5; 
}

function criarBaralho(){
    listaGifs.sort(comparador);

    for(let i=0; i<(numeroCartas/2); i++){
        listaGifs2.push(listaGifs[i]);
        listaGifs2.push(listaGifs[i]);
    }

    listaGifs2.sort(comparador);
    insereCartas();
}

function insereCartas(){
    const quadro = document.querySelector('.quadro');

    for(let i=0; i<numeroCartas; i++){        
        quadro.innerHTML += `<button data-test="card" onclick="virarCarta(this)" class="carta">
        <div data-test="face-up-image" class="frente card"> <img src="${listaGifs2[i]}"></div>
        <div data-test="face-down-image" class="verso card">
            <img src="./img/back.png">
        </div>
        </button>`;
    }
}


function desvirar(){
    
    for(let i=0; i<viradasRecentementeFrente.length; i++){
        viradasRecentementeFrente[i].classList.remove("carta-frente");
        viradasRecentementeVerso[i].classList.remove("carta-verso");
    }

    viradasRecentementeFrente = [];
    viradasRecentementeVerso = [];
    cartasViradas=0;
}

function desabilitarBotao(cartaParaDesabilitar){
    cartaParaDesabilitar.parentNode.toggleAttribute('disabled');
}

function virarCarta(cartaSelecionada){
    quantidadeDeJogadas++;
    cartasViradas++;

    if(cartasViradas<=2){

        const cartaFrente = cartaSelecionada.querySelector(".frente");
        const cartaVerso = cartaSelecionada.querySelector(".verso");
        

        viradasRecentementeFrente.push(cartaFrente);
        viradasRecentementeVerso.push(cartaVerso);


        cartaFrente.classList.add("carta-frente");
        cartaVerso.classList.add("carta-verso");

        
        desabilitarBotao(cartaFrente);
        if(cartasViradas>=2){

            if(viradasRecentementeFrente[0].innerHTML===viradasRecentementeFrente[1].innerHTML){
                /*chamar função para tirar o onclick*/

                viradasRecentementeFrente = [];
                viradasRecentementeVerso = [];
                quantidadeDeAcertos++;
                cartasViradas=0;

            }else{
                setTimeout(desvirar, 1000);
                for(let i=0; i<viradasRecentementeFrente.length; i++){
                    desabilitarBotao(viradasRecentementeFrente[i]);
                }
            }
            
        }
        if(quantidadeDeAcertos==(numeroCartas/2)){
            setTimeout(fim, 1000)
        }

    }
    
}

function fim(){
    alert(`Você ganhou em ${quantidadeDeJogadas} jogadas!`);
    document.querySelector('.overlay').classList.remove('escondido');
}

function reiniciarOuEncerrar(opcaoEscolhida){
    if(opcaoEscolhida.classList.contains('botaoSim')){
        window.location.reload(true);
    }else{
        document.querySelector('.overlay').classList.add('escondido');
    }
}
