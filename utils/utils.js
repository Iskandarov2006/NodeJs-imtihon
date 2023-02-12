import fs  from 'fs'
import path  from 'path'

function read(filename) {
    const data = fs.readFileSync(path.resolve('database', filename + '.json'), 'utf-8')
    return JSON.parse(data)
}

function write(filename, data){
    const user = fs.writeFileSync(path.resolve('database', filename + '.json'), JSON.stringify(data, null, 4))
    return true
}
export {
    write, read
}