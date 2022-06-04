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

      while (res.indexOf(randomIndex) !== -1) {
        randomIndex = Math.floor(Math.random() * array.length)
      }

      return res.concat(randomIndex)
    }, [])

  return randomIndices.map(individual => array[individual])

  
}

export const createPrompt = () => {
  // TODO implement createPrompt
}

export const createQuestions = () => {
  // TODO implement createQuestions
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
