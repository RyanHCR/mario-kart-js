const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};
const player2 = {
  NOME: "Peach",
  VELOCIDADE: 1,
  MANOBRABILIDADE: 2,
  PODER: 10,
  PONTOS: 0,
};

//Dado para rolar:
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
//Sorteador de Rodada
async function randomBlock() {
  const roundBlock = Math.floor(Math.random() * 3) + 1;
  let result;
  switch (roundBlock) {
    case 1:
      result = "RETA";
      break;
    case 2:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}
//Registro dos resultados
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(`${characterName} rolou o dado de ${block} ${diceResult} + ${attribute} =
   ${attribute + diceResult}`);
}
//Sistema da corrida
async function raceEngine(character1, character2) {
  for (let round = 1; round < 6; round++) {
    console.log(`Começando o round: ${round}`);

    let block = await randomBlock();
    console.log(`Bloco: ${block}`);

    //Pegando resultado do dado
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //Pegando resultado de poder
    let totalSkillResult1 = 0;
    let totalSkillResult2 = 0;

    if (block === "RETA") {
      totalSkillResult1 = diceResult1 + character1.VELOCIDADE;
      totalSkillResult2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "CURVA") {
      totalSkillResult1 = diceResult1 + character1.MANOBRABILIDADE;
      totalSkillResult2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`${player1.NOME} GANHOU!`);
        character2.PONTOS--;
      }
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`${player2.NOME} GANHOU!`);
        character1.PONTOS--;
      }
      if (powerResult1 === powerResult2) {
        console.log("Confronto resultou em um empate !");
      }
    }
    if (totalSkillResult1 > totalSkillResult2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalSkillResult2 > totalSkillResult1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }
  }
}
//Declarar vencedor:
async function declareWinner(character1, character2) {
  console.log("Resultado Final:");
  console.log(`${character1.NOME} : ${character1.PONTOS}`);
  console.log(`${character2.NOME} : ${character2.PONTOS}`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`O vencedor é: ${character1.NOME}`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`O vencedor é: ${character2.NOME}`);
  } else {
    console.log("Corrida empatou !");
  }
}
//Executar a corrida:
(async function main() {
  console.log(`Corrida começando entre ${player1.NOME} e ${player2.NOME}`);

  await raceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
