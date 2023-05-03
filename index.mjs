import * as readline from 'readline'

function getPasswordChecker(password) {
    const result = (check_password) => {
        return (check_password === password)
    }
    return result
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Задайте пароль: ', (pass) => {
    const checkPassword = getPasswordChecker(pass)
    rl.question('Повторите пароль: ', (password_idnt) => {
        if (checkPassword(password_idnt)) {
            console.log('Молодец, пароли совпали.')
        } else {console.log('Плохо, пароли не совпали.')}
    rl.close()
    })
  })