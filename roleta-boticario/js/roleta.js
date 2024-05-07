const items = [
  ["Item 01", 0], // Passou a Vez
  ["Item 02", 50], // Garfield
  ["Item 03", 0], // Tente +1 Vez
  ["Item 04", 0], // Tablete de Chocolate
  ["Item 05", 0], // Passou a Vez
  ["Item 06", 50], // Ursinhos Carinhosos
  ["Item 07", 0], // Tente +1 Vez
  ["Item 08", 0], // Bombom
];

$(".div-roulette").on("click", function () {
  rodaARoda();
});

$(document).keypress(function (event) {
  if (event.charCode == 13 || event.charCode == 32) {
    rodaARoda();
  }
});

function jogarConfetti() {
  let params = {
    particleCount: 500, // Quantidade de confetes
    spread: 90, // O quanto eles se espalham
    startVelocity: 70, // Velocidade inicial
    origin: { x: 0, y: 0.5 }, // Posição inicial na tela
    angle: 45, // Ângulo em que os confetes serão lançados
  };

  // Joga confetes da esquerda pra direita
  confetti(params);

  // Joga confetes da direita para a esquerda
  params.origin.x = 1;
  params.angle = 135;
  confetti(params);
}

let giradaPrimeiraVez = false;

function rodaARoda() {
  if (!$("#roulette").hasClass("girando")) {
    let weight = [];
    let choosedIndex;

    // Verifica se é a primeira vez que a roleta está sendo girada
    if (!giradaPrimeiraVez) {
      // Se for a primeira vez, seleciona os itens 03 ou 07
      const firstRoundOptions = [2, 6];
      choosedIndex =
        firstRoundOptions[Math.floor(Math.random() * firstRoundOptions.length)];
      giradaPrimeiraVez = true; // Atualiza a flag para indicar que a primeira vez já ocorreu
    } else {
      // Se não for a primeira vez, seleciona os itens 02 ou 06
      const secondRoundOptions = [1, 5];
      choosedIndex =
        secondRoundOptions[
          Math.floor(Math.random() * secondRoundOptions.length)
        ];
    }

    items.forEach((item, key) => {
      for (let i = 0; i < item[1]; i++) {
        weight.push(key);
      }
    });

    let choosedItem = items[choosedIndex][0];
    $("#roulette").removeAttr("class");
    setTimeout(() => {
      document.getElementById("roleta-audio").volume = 0.01;
      document.getElementById("roleta-audio").play();
      return $("#roulette")
        .addClass(`number-${choosedIndex + 1}`)
        .addClass("girando");
    }, 50);

    setTimeout(() => {
      $("#roulette").removeClass("girando");
      if ([1, 3, 5, 7].includes(choosedIndex)) {
        jogarConfetti();
      } else if ([0, 2, 4, 6].includes(choosedIndex)) {
        window.parent.postMessage({ tipo: "tryPopup" }, "*");
      }
      if ([1].includes(choosedIndex)) {
        window.parent.postMessage({ tipo: "botaoResgatarGarfield" }, "*");
      } else if ([5].includes(choosedIndex)) {
        window.parent.postMessage({ tipo: "botaoResgatarUrsinhosCarinhosos" }, "*");
      }
    }, 23000);
  }
}
