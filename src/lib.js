import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  if (array === undefined || array.length <= 1 || numItems <= 1) {
    return array
  } else if (
    numItems === undefined ||
    numItems <= 0 ||
    numItems > array.length
  ) {
    numItems = Math.floor(Math.random() * array.length)
  }


  const randomIndices = Array(numItems) 
    .fill() 
    .reduce(res => {
      let randomIndex = Math.floor(Math.random() * array.length)

      return res.concat(randomIndex)
    }, [])

  return randomIndices.map(individual => array[individual])
}

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  const numQuestionsN = Number(numQuestions)
  const numChoicesN = Number(numChoices)
  const questionObject = questionNumber => ({
    type: 'input',
    name: `question-${questionNumber}`,
    message: `Enter question ${questionNumber}`
  })

  const choiceObject = (choiceNumber, questionNumber) => ({
    type: 'input',
    name: `question-${questionNumber}-choice-${choiceNumber}`,
    message: `Enter answer choice ${choiceNumber} for question ${questionNumber}`
  })

  return Array(numQuestionsN + numQuestionsN * numChoicesN)
    .fill()
    .map((x, index) => {
      if (index % (numChoicesN + 1) === 0) {
        return questionObject(
          index / (numChoicesN + 1) ? index / (numChoicesN + 1) + 1 : 1
        )
      } else {
        return choiceObject(
          index % (numChoicesN + 1),
          Math.ceil(index / (numChoicesN + 1))
        )
      }
    })
 
}

export const createQuestions = (questionObject = {}) => {
  let questionKeys = Object.keys(questionObject)

  let questions = []

  questionKeys.forEach(element => {
    if (!element.includes('choice')) {
      questions[element] = {
        type: 'list',
        name: element,
        message: questionObject[element],
        choices: []
      }
    } else {
   
      let indexString = 'question-' + element.split('-')[1]
      let tempObject = questions[indexString]
      tempObject['choices'].push(questionObject[element])
    }
  })

  return Object.values(questions)
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
