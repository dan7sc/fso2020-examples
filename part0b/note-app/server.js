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
    json: 'application/json'
};

const files = {
    html: {
        name: 'index.html',
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

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        for (let key in files) {
            if (req.url === files[key].url)
                sendFileContentToClient(res, files[key].name);
        }
    }
    if (req.method === 'POST') {
        let dataToSend;
        const dataRaw = readFileContent(files.json.name);
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
            fs.writeFileSync(path.join(__dirname, files.json.name), dataToSend, 'utf-8', () => {});
        });
        res.writeHead(302, {
            'Location': '/notes'
        });
    }
    res.end();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
