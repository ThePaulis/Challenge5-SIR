
//Faz com que sempre que entra na pagina aparecam os Livros
window.onload = function() {
    GetLivros();
};


//Main Scripts
function GetLivros() {
    fetch('https://challenge5-sir.onrender.com/Livros')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const livros = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            const tableBody = document.querySelector('#Results tbody');
            tableBody.innerHTML = '';

            livros.forEach((livro) => {
                const row = tableBody.insertRow();
                const Id = livro.id;
                row.innerHTML = `
                    <td id="Id-${Id}">${livro.id}</td> 
                    <td id="Titulo-${Id}">${livro.Titulo}</td>
                    <td id="Ano_Lancamento-${Id}">${livro.Ano_Lancamento}</td>
                    <td id="Edicao-${Id}">${livro.Edicao}</td>
                    <td id="Linguagem-${Id}">${livro.Linguagem}</td>
                    <td id="DeleteButton-${Id}"><button id="DeleteButton" onclick="DeleteLivro(${Id})">Deletar</button></td>
                    <td id="AlterarButton-${Id}"><button id="AlterarButton" onclick="AlterarDados(${Id})">Alterar</button></td>
                    <td id="SaveChanges-${Id}"><button id="SaveChanges" onclick="UpdateInputValue(${Id})">Save</button></td>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

function GetLivrosById() {
    const id = document.getElementById('ProcurarId').value;
        fetch(`https://challenge5-sir.onrender.com/Livros/${id}`)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                const tableBody = document.querySelector('#LivroProcurarId tbody');
                tableBody.innerHTML = '';
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${data.id}</td> 
                    <td>${data.Titulo}</td>
                    <td>${data.Ano_Lancamento}</td>
                    <td>${data.Edicao}</td>
                    <td>${data.Linguagem}</td>
                
                `;

            })
            .catch(error => console.error('Error:', error));
}



function CreateLivro() {
    const newLivro = {
        Titulo: document.getElementById('Titulo').value,
        Ano_Lancamento: document.getElementById('Ano_Lancamento').value,
        Edicao: document.getElementById('Edicao').value,
        Linguagem: document.getElementById('Linguagem').value
    };

    fetch('https://challenge5-sir.onrender.com/Livros/Create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLivro),
        mode: 'cors'
    })
        .then(data => {
            console.log('Success:', data);
            GetLivros();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





function UpdateLivro(id,NewValues){
const UpdatedLivro = {
    Titulo: NewValues[0],
    Ano_Lancamento: NewValues[1],
    Edicao: NewValues[2],
    Linguagem: NewValues[3]

}
    fetch(`https://challenge5-sir.onrender.com/Livros/Update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UpdatedLivro),
        mode: 'cors'
    })  .then(response => response.json())

        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function DeleteLivro(id){
    fetch(`https://challenge5-sir.onrender.com/Livros/Delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })  .then(response => response.json())
        .then(data => {
            console.log(data);
            GetLivros();
        })
        .catch(error => console.error('Error:', error));

    location.reload();

}


function AlterarDados(id) {
    const fields = [ "Titulo", "Ano_Lancamento", "Edicao", "Linguagem"];
    fields.forEach(field => {
        const tdElement = document.getElementById(`${field}-${id}`);

        if (tdElement) {
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.value = tdElement.textContent;
            inputElement.id = `${field}-input`
            tdElement.innerHTML = "";
            tdElement.appendChild(inputElement);
        }
    });


}
function UpdateInputValue(id){

    const NewValues = [];
    const fields = [ "Titulo", "Ano_Lancamento", "Edicao", "Linguagem"];

    fields.forEach(field =>{
        NewValues.push(document.getElementById(`${field}-input`).value);
    })
    UpdateLivro(id,NewValues);
    location.reload();
}

function aboutPage(){
    window.location.href = 'https://challenge5-sir.onrender.com/about';

}
function DocPage(){
    window.location.href = 'https://challenge5-sir.onrender.com/doc';

}
