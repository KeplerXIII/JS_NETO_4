import readline from 'readline';
import fs from 'fs/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;
let numberOfGuesses = 0;

const logGameStart = async () => {
  try {
    await fs.appendFile('game.log', `\n*********\nНовая игра. Загадано: ${secretNumber}\n`);
  } catch (err) {
        console.error(err);
  }
};

const logGameResult = async (answer) => {
  const message = (Number(answer) === secretNumber) ?
   `Пользователь ввёл ${answer} и угадал число. Всего попыток: ${numberOfGuesses}\n` :
   `Пользователь ввёл: ${answer}\n${answer < secretNumber ? 'Загаданное число больше.' : 'Загаданное число меньше.'} Попыток сделано: ${numberOfGuesses}\n`
  try {
    await fs.appendFile('game.log', message);
  } catch (err) {
    console.error(err);
  }
};

const game = async () => {
  let answer;
  try {
    answer = await new Promise(resolve => rl.question('Угадайте число от 1 до 100: ', resolve)); // Обёртка промиса над коллбэком
  } catch (err) {
    console.error(err);
  }
  numberOfGuesses++;

  if (Number(answer) === secretNumber) {
    console.log(`Поздравляем, вы угадали число ${secretNumber} за ${numberOfGuesses} попыток!`);
    await logGameResult(answer);
    rl.close();
    return;
  }

  if (Number(answer) < secretNumber) {
    console.log(`Загаданное число больше. Попыток сделано:${numberOfGuesses}`);
  } else {
    console.log(`Загаданное число меньше. Попыток сделано:${numberOfGuesses}`);
  }

  await logGameResult(answer);
  game();
};

(async () => {
  await logGameStart();
  await game();
})();
