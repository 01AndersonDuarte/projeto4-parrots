let numeroCartas = prompt("Informe a quantidade de cartas: ");
while(numeroCartas%2!==0 || numeroCartas<4 || numeroCartas>14){
    alert("Quantidade informada inválida, por favor digite um novo valor: ");
    numeroCartas = prompt("Quantidade de cartas: ");
}


const quadro = document.querySelector('.quadro');
let indice = 0;

while(indice<numeroCartas){
    quadro.innerHTML += `<div class="carta"><img src="./img/back.png"></div>`;
    indice++;
}
