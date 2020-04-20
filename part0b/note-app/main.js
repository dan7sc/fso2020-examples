const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        const data = JSON.parse(xhttp.response);
        console.log(data);

        const ul =document.createElement('ul');
        ul.setAttribute('class', 'notes');

        data.forEach(note => {
            const li = document.createElement('li');
            ul.appendChild(li);
            li.appendChild(document.createTextNode(note.content));
        });

        document.getElementById('notes').appendChild(ul);
    }
};

xhttp.open('GET', '/data.json', true);
xhttp.send();
