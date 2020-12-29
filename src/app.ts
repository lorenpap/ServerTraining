import * as http from "http";
import {IncomingMessage, Server, ServerResponse} from "http";
import {ListenOptions} from "net";
import * as fs from "fs";

const filePath: string = './text/exampleFile.txt';
const contentOptions: ListenOptions = {
    host: 'localhost',
    port: 3000
};

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    dataByUrl(req, res);
});

server.listen(contentOptions, () => {
    console.log(`Server running at http://${contentOptions.host}:${contentOptions.port}/`);
});

function dataByUrl(req: IncomingMessage, res: ServerResponse) {
    if (req.url === '/CONTENT') {
        content(res);
    }
    if (req.url === '/updateTime') {
        updateTime().then(data => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        }).catch(err => {
            res.statusCode = 404;
            res.statusMessage = err.message;
        });
    }
}

function content(res: ServerResponse) {
    const data = fs.createReadStream(filePath, 'utf8');
    data.on('data', (chunk: string) => {
        res.write(chunk.toUpperCase());
    });
    data.on('end', () => {
        res.statusCode = 200;
        res.end();
    });
    data.on('error', (err: Error) => {
            res.statusCode = 404;
            res.statusMessage = err.message;
        }
    );
}

function updateTime() {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats.mtime.toString());
        });
    })
}
