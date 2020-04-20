let notes = [];

const redrawNotes = () => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'notes');

    notes.forEach(note => {
        const li = document.createElement('li');
        ul.appendChild(li);
        li.appendChild(document.createTextNode(note.content));
    });

    const notesElement = document.getElementById('notes');
    if (notesElement.hasChildNodes())
        notesElement.removeChild(notesElement.childNodes[0]);
    notesElement.appendChild(ul);
};

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        notes = JSON.parse(xhttp.response);
        console.log(notes);
        redrawNotes();
    }
};
xhttp.open('GET', '/notes', true);
xhttp.send();

const sendToServer = (note) => {
    const xhttpForPost = new XMLHttpRequest();
    xhttpForPost.onreadystatechange = () => {
        if (xhttpForPost.readyState === 4 && xhttpForPost.status === 201)
            console.log(xhttpForPost.responseText);
    };
    xhttpForPost.open('POST', '/new_note_spa', true);
    xhttpForPost.setRequestHeader('Content-Type', 'application/json');
    xhttpForPost.send(JSON.stringify(note));
};

window.onload = (e) => {
    const form = document.getElementById('notes_form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const note = {
            content: e.target.elements[0].value,
            data: new Date()
        };
        notes.push(note);
        e.target.elements[0].value = '';
        redrawNotes();
        sendToServer(note);
    };
};
