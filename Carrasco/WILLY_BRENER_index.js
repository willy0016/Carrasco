const readline = require("readline-sync");

// Palavras do jogo
const palavras = ["jogos", "filmes", "series", "valorant", "computador"];

// Escolhe uma palavra aleatoria
let palavraAlvo = palavras[Math.floor(Math.random() * palavras.length)];

let palavraCompletada = new Array(palavraAlvo.length).fill("_");

let letrasErradas = [];

// Numero de tentativas
let tentativasRestantes = 6;

// Exibe o jogo na tela
function exibirJogo() {
  console.log("");
  console.log(`Palavra: ${palavraCompletada.join(" ")}`);
  console.log(`Letras erradas: ${letrasErradas.join(", ")}`);
  console.log(`Tentativas restantes: ${tentativasRestantes}`);
}

function processarJogada() {
  exibirJogo();

  const letra = readline.question("Digite uma letra: ").toLowerCase();

  // Verifica se a letra já foi digitada antes
  if (letrasErradas.includes(letra) || palavraCompletada.includes(letra)) {
    console.log(`Você já digitou a letra "${letra}". Tente novamente.`);
    return;
  }

  // Verifica se a letra ja existe
  let letraEncontrada = false;
  for (let i = 0; i < palavraAlvo.length; i++) {
    if (palavraAlvo[i] === letra) {
      palavraCompletada[i] = letra;
      letraEncontrada = true;
    }
  }

  if (!letraEncontrada) {
    letrasErradas.push(letra);
    tentativasRestantes--;
  }
}

// jogar novamente
while (true) {
  while (true) {
    processarJogada();

    if (palavraCompletada.join("") === palavraAlvo) {
      console.log(`Você se salvou!`);
      break;
    } else if (tentativasRestantes === 0) {
      console.log(`Você se enforcou! A palavra certa era ${palavraAlvo}.`);
      break;
    }
  }

  const jogarNovamente = readline.question("Deseja jogar novamente? (s/n): ").toLowerCase();
  if (jogarNovamente !== "s") {
    break;
  }

  palavraAlvo = palavras[Math.floor(Math.random() * palavras.length)];
  palavraCompletada.fill("_");
  letrasErradas.length = 0;
  tentativasRestantes = 6;

  exibirJogo();
}