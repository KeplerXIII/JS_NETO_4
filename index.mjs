import * as readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;
let numberOfGuesses = 0

fs.appendFile('game.log', `\n*********\nНовая игра. Загадано: ${secretNumber}\n`, (err) => {
  if (err) {
    console.error(err)
  }
})

const game = () => {
  rl.question('Угадайте число от 1 до 100: ', (answer) => {
    const guess = Number(answer)
    let output = ''
    numberOfGuesses++
  
    if (guess === secretNumber) {
      console.log(`Поздравляем, вы угадали число ${secretNumber} за ${numberOfGuesses} попыток!`)

      fs.appendFile('game.log', `Пользователь ввёл ${answer} и угадал число. Всего попыток: ${numberOfGuesses} \n`, (err) => {
        if (err) {
          console.error(err)
        }
      })

      rl.close()
      return
    } else if (guess < secretNumber) {
      output = `Загаданное число больше. Попыток сделано: ${numberOfGuesses}`
    } else {
      output = `Загаданное число меньше. Попыток сделано: ${numberOfGuesses}`
    }
    
    console.log(output)

    fs.appendFile('game.log', `Пользователь ввёл: ${answer}\n${output}\n`, (err) => {
      if (err) {
        console.error(err)
      }
    })

    game()
  })
}

game()