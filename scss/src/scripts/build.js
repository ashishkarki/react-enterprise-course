const fs = require('fs')
const path = require('path')
const sass = require('node-sass')

const getComponents = () => {
  let allComponents = []

  const types = ['atoms', 'molecules', 'organisms']

  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`, //path.resolve(type, file),
      output: `src/lib/${file.slice(0, -4) + 'css'}`,
    }))

    allComponents = [...allComponents, ...allFiles]
  })

  return allComponents
}

// 'src/lib/global.css' 'src/global.scss'
const compile = (inputPath, outputFilename) => {
  const sassed = sass.renderSync({
    data: fs.readFileSync(path.resolve(inputPath)).toString(),
    outputStyle: 'expanded',
    outFile: 'global.css',
    includePaths: [path.resolve('src')],
  })

  fs.writeFileSync(path.resolve(outputFilename), sassed.css.toString())
}

compile('src/global.scss', 'src/lib/global.css')

console.log(getComponents())

getComponents().forEach((component) => {
  compile(component.input, component.output)
})
