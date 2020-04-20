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
        url: '/'
    },
    css: {
        name: 'main.css',
        url: '/style'
    },
    js: {
        name: 'spa.js',
        url: '/script'
    },
    json: {
        name: 'data.json',
        url: '/notes'
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
        const data = readFileContent(files.json.name);
        const dataObj = JSON.parse(data);
        req.on('data', dataClient => {
            const payload = JSON.parse(dataClient.toString());
            const newNote = {
                id: dataObj.length + 1,
                content: payload.content,
                date: new Date(),
                important: false
            };
            dataObj.push(newNote);
            const dataToStore = JSON.stringify(dataObj, null, 4);
            fs.writeFileSync(path.join(__dirname, files.json.name), dataToStore, 'utf-8', () => {});
        });
        res.statusCode = 201;
        const response = {message: 'note created'};
        res.end(JSON.stringify(response));
    }
    res.end();
});

server.listen(port, () => console.log(`Listening on port ${port}`));
