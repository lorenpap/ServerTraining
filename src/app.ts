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

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(req.url === '/CONTENT' ? content() : req.url === '/updateTime' ? updateTime() : null)
})

server.listen(contentOptions, () => {
    console.log(`Server running at http://${contentOptions.host}:${contentOptions.port}/`)
})

function content() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return (data.toUpperCase());
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

function updateTime() {
    return fs.statSync(filePath).mtime.toString()
}
