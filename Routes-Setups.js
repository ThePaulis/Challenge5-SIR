//IMPORTS
import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import {CreateDocument, DeleteLivroById, ListarAllData, ListarById, UpdateLivro} from './MongooseDB/SchemaAndModel.js';
import Connection from './MongooseDB/Connection.js'


//CONSTS
const defaultData = { Livors: [{id: 1, Titulo: "Lusiadas", Ano_Lancamento: 1572, Edicao: "1", Linguagem: "PT" }] }
const db = await JSONFilePreset('Livros.json', defaultData);

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

//ROUTES
app.get('/about', (req, res) => {
    const aboutPagePath = path.resolve('public', 'about.html');
    if (aboutPagePath){
        res.status(200).sendFile(aboutPagePath);

    }else {
        res.status(400).send('Not found');
    }
});
app.get('/doc', (req, res) => {
    const docPagePath = path.resolve('public', 'doc.html');
    if (docPagePath){
        res.status(200).sendFile(docPagePath);

    }else {
        res.status(400).send('Not found');
    }
});


app.get('/Livros', async (req, res) => {
    try {
        const Livors = await ListarAllData();
        if (Livors && Livors.length > 0) {
            res.status(200).json(Livors);
        } else {
            res.status(404).send('No livros found');
        }
    } catch (error) {
        res.status(500).send('Error fetching livros');
        console.error(error);
    }
});

app.get('/Livros/:id', async (req, res) => {

    const Livro = await ListarById(req.params.id);
    if (Livro) {
        res.status(200).json(Livro);
    } else {
        res.status(404).send('Livro not found');
    }
});

app.post('/Livros/Create', async (req, res) => {
    const { Titulo, Ano_Lancamento, Edicao, Linguagem } = req.body;

    try {
        await Connection();


        // Get the current list of documents to determine the next ID
        const Livros = await ListarAllData();

        function getNextId() {
            if (Livros.length === 0) return 1;

            const ids = Livros.map((item) => parseInt(item.id)).sort((a, b) => a - b);

            for (let i = 0; i < ids.length; i++) {
                if (ids[i] !== i + 1) {
                    return i + 1;
                }
            }

            return ids[ids.length - 1] + 1;
        }

        let id = getNextId().toString();

        const newLivro = {
            id: id,
            Titulo,
            Ano_Lancamento,
            Edicao,
            Linguagem,
        };
        const savedLivro = await CreateDocument(newLivro);

        // Send a success response
        res.status(201).json({ message: 'Livro created successfully', livro: savedLivro });
    } catch (error) {
        console.error('Error saving the document:', error);
        res.status(500).json({ message: 'Error creating Livro', error });
    }
});

app.put('/Livros/Update/:id', async (req, res) => {
    const { Titulo, Ano_Lancamento, Edicao, Linguagem } = req.body;
    const id = req.params.id;

    const newLivro = {
        id,
        Titulo,
        Ano_Lancamento,
        Edicao,
        Linguagem
    };

    try {
        await Connection();

        // Check if the livro with the given ID exists
        const existingLivro = await ListarById(id);
        if (!existingLivro || existingLivro.length === 0) {
            return res.status(404).json({ message: 'Livro not found' });
        }

        const result = await UpdateLivro(newLivro);

        if (result.success) {
            return res.status(200).json({ message: 'Livro updated successfully', livro: result.livro });
        } else {
            return res.status(400).json({ message: 'Failed to update Livro', error: result.error });
        }
    } catch (error) {
        console.error('Error updating livro:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});


app.delete('/Livros/Delete/:id', async (req, res) => {
    try {
        await Connection();
        const id = req.params.id;
        const deletedLivro = await DeleteLivroById(id);
        if (deletedLivro) {
            res.status(200).json({ message: 'Livro removed successfully', livro: deletedLivro });
        } else {
            res.status(404).send('Livro not found');
        }
    } catch (error) {
        console.error('Error deleting livro:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
