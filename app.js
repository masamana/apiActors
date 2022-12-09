const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

const books = [
    {
        id: 1,
        name: "Villa Vortex",
        isbn:"123456789",
        genre:"Blabla",
        author:"Denis Labaste",
        resume:"Le livre à lire",
        year: 1985
    }, 
    {
        id: 2,
        name: "Hop hop hop",
        isbn:"123456788",
        genre:"Blablabli",
        author:"Cindy Dutrait",
        resume:"Le livre à relire",
        year: 1989
    }
        
];


app.get('/api/books', (req, res) => {
    res.json(books);
});

// lire, récuperer
app.get('/api/books/:id', (req, res) => {
    res.json(books.find(book => {
        return book.id == req.params.id;
        }));
});

// supprimer
app.delete('/api/books/:id', (req, res) => {
    const index = books.findIndex(book => {
        return book.id == req.params.id;
    });
    books.splice(index, 1);
    res.json({});
});

// ajouter au serveur
app.put('/api/books', (req, res) => {

    const book = {
        id: books.length + 1,
        name: req.body.name,
        isbn:req.body.isbn,
        genre: req.body.genre,
        author: req.body.author,
        resume: req.body.resume,
        year: req.body.year

    };
    books.push(book);
    res.json(book);
});


// modifier un élément existant
app.patch('/api/books/:id', (req, res) => {
    const book = books.find(book => {
        return book.id == req.params.id;
    });

    book.name = req.body.name || book.name;
    book.isbn = req.body.isbn || book.isbn;
    book.genre = req.body.genre || book.genre;
    book.author = req.body.author || book.author;
    book.resume = req.body.resume || book.resume;
    book.year = req.body.year || book.year;

    res.json(books);
});






app.listen(port, () => {
    console.log("server up");

});