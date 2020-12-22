import {IncomingMessage, ServerResponse} from "http";
import {ListenOptions} from "net";

const http = require('http')
const fs = require('fs')
const filePath: string = './text/exampleFile.txt'
const contentOptions: ListenOptions = {
    host: 'localhost',
    path: '/CONTENT',
    port: 3000
}
let fileContent: string = '';
content()
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(req.url === '/CONTENT' ? fileContent.toUpperCase() : req.url === '/updateTime' ? updateTime() : null)
})

server.listen(contentOptions, () => {
    console.log(`Server running at http://${contentOptions.host}:${contentOptions.port}/`)
})

function content() {
    fileContent = ''
    const data = fs.createReadStream(filePath, 'utf8');
    data.on('data', (chunk: string) => {
        fileContent += chunk
    })
    data.on('error', (err: Error) => console.log(err))
}

function updateTime() {
    return fs.statSync(filePath).mtime.toString()
}
