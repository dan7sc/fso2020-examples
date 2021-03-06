const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const port = 3001;

const mimeTypes = {
    text: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png'
};

const indexFiles = {
    html: {
        name: 'index.html',
        url: '/'
    },
    png: {
        name: 'kuva.png',
        url: '/kuva.png'
    }
};

const noteFiles = {
    html: {
        name: 'notes.html',
        url: '/notes'
    },
    css: {
        name: 'main.css',
        url: '/main.css'
    },
    js: {
        name: 'main.js',
        url: '/main.js'
    },
    json: {
        name: 'data.json',
        url: '/data.json'
    }
};

const readFileContent = (file) => {
    return fs.readFileSync(path.join(__dirname, '/', file));
};

const sendFileContentToClient = (response, file) => {
    const fileContent = readFileContent(file);
    const fileType = file.split('.')[1];
    response.writeHead(200, {
        'Content-Type': mimeTypes[fileType]
    });
    response.end(fileContent);
};

const replaceExpressionInContent = (content, newExpression) => {
    const initialIndex = content.indexOf('{{');
    const finalIndex = content.indexOf('}}') + 2;
    const contentOne = content.slice(0, initialIndex);
    const contentTwo = content.slice(finalIndex);
    const newContent = contentOne + newExpression + contentTwo;
    return newContent;
};

const getNumberOfNotes = (file) => {
    return JSON.parse(readFileContent(noteFiles.json.name).toString()).length;
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const template = path.join(__dirname, '/index-template.html');
        const indexHtml = path.join(__dirname, indexFiles.html.name);
        const numberOfNotes = getNumberOfNotes(noteFiles.json.name);
        const contentStr = readFileContent('index-template.html').toString();
        const newContent = replaceExpressionInContent(contentStr, numberOfNotes);
        fs.copyFileSync(template, indexHtml);
        fs.writeFileSync(indexHtml, newContent);
        sendFileContentToClient(res, indexFiles.html.name);
    }
    if (req.method === 'GET' && req.url === '/kuva.png') {
        sendFileContentToClient(res, indexFiles.png.name);
    }
    if (req.method === 'GET') {
        for (let key in noteFiles) {
            if (req.url === noteFiles[key].url)
                sendFileContentToClient(res, noteFiles[key].name);
        }
    }
    if (req.method === 'POST') {
        let dataToSend;
        const dataRaw = readFileContent(noteFiles.json.name);
        const dataObj = JSON.parse(dataRaw);
        req.on('data', data => {
            const payload = querystring.parse(data.toString());
            const newNote = {
                id: dataObj.length + 1,
                content: payload.note,
                date: new Date(),
                important: false
            };
            dataObj.push(newNote);
            dataToSend = JSON.stringify(dataObj, null, 4);
            fs.writeFileSync(path.join(__dirname, noteFiles.json.name), dataToSend, 'utf-8', () => {});
        });
        res.writeHead(302, {
            'Location': '/notes'
        });
    }
    res.end();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
