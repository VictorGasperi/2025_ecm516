// const nome = 'José'
// console.log(nome)

// var linguagem = "Javascript"
// console.log(linguagem)
// var linguagem = "Java"
// console.log(linguagem)

// var idade = 18

// console.log(nome)

// if (idade >= 18) {

//     var nome = 'Victor'
//     console.log('Parabéns!')

// }

// console.log(nome)

// const nomes = ['Ana Maria', 'Antonio', 'Rodrigo', 'Alex', 'Cristina']

/// Programacao imperativa

// const result = []

// for (let nome of nomes) {
//     if (nome.charAt(0) === 'A') {
//         result.push(nome)
//     }
// }

// console.log(result)

/// Programacao declarativa -> Utilizando o privilegio de que as funcoes sao cidadas de primeira classe no javascript

// const result = nomes.filter( nome => nome.startsWith('A') )

// console.log(result)

// for (let nome of nomes) {
//     result.push(nome.charAt(0))
// }

// console.log(result)

// const result = nomes.map( nome => nome.charAt(0))
// console.log(result)

// const result = nomes.every( nome => nome.startsWith('A'))

// const result = nomes.some( nome => nome.startsWith('A') )

// console.log(result)

const valores = [1, 2, 3, 4]

const result = valores.reduce( (acc, val) => acc + val)
console.log(result)