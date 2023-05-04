import * as readlineSync from 'readline-sync';
import fs from 'fs';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getUserInput() {
  return new Promise(resolve => {
      const userResponse = readlineSync.question('Введите число от 1 до 100: ');
      resolve(userResponse);
    });
}

async function guessNumber() {
  const secretNumber = random(1, 100);
  let attempts = 0;
  let done = false;
  let message =`*****\nИгра началась. Загаданное число ${secretNumber}`;

  const fileStream = fs.createWriteStream('./user-answers.log', {flags: 'a'});
  
  fs.closeSync(fs.openSync('./user-answers.log', 'a'));
  fileStream.write(`${message}\n`);

  while (!done) {
    const input = await getUserInput();

    fileStream.write(`Пользователь: ${input}\n`);

    if (isNaN(input)) {
      message = `Вы ввели не число. Попробуйте снова.`
      fileStream.write(`Система: ${message}\n`);
      console.log("Вы ввели не число. Попробуйте снова.");
      continue;
    }

    attempts++;

    if (input < secretNumber) {
      message = `Загаданное число больше. Попыток: ${attempts}`
      fileStream.write(`Система: ${message}\n`);
      console.log(message);
    } else if (input > secretNumber) {
      message = `Загаданное число меньше. Попыток: ${attempts}`
      fileStream.write(`Система: ${message}\n`);
      console.log(message);
    } else {
      done = true;
    }
  }
  message = `Вы угадали число "${secretNumber}" за ${attempts} попыток`
  fileStream.write(`Система: ${message}\n`);
  console.log(message);
  fileStream.end();
}

guessNumber();