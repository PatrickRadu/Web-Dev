
const express = require('express');
const app = express();
app.use(express.json());
var morgan = require('morgan')
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));
let phonebook = 
    [
        { 
          "id": "1",
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": "2",
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": "3",
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": "4",
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]
    // const requestLogger = (request, response, next) => {
    //     console.log('Method:', request.method)
    //     console.log('Path:  ', request.path)
    //     console.log('Body:  ', request.body)
    //     console.log('---')
    //     next()
    //   }
    //   app.use(requestLogger)

     morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

    app.use(morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms',
          tokens.body(req,res)
        ].join(' ')
    }))
    app.get('/',(req,res)=>{
        res.send('<h1>Hello World</h1>');
    })

    app.get('/api/persons',(req,res)=>{
        res.json(phonebook);
    })

    app.get('/api/info',(req,res)=>{
       const phonebookLength=phonebook.length;
       res.send(`<p>Phonebook has info for ${phonebookLength} people</p>
        <br></br>
        <p>${new Date()}</p>`);
        if(phonebookLength===0){
            res.status(404).end();
        }
    })

    app.get('/api/persons/:id',(req,res)=>{
        const id=req.params.id;
        const person=phonebook.find((person)=>person.id===id);
        console.log(person);
        if(person){
            res.json(person);
        }
        else 
        {
            res.status(404).end();
        }
    })
    
    app.delete('/api/persons/:id',(req,res)=>{
        const id=req.params.id;
        phonebook=phonebook.filter(person=>person.id!==id);
        res.status(204).end();
    })

    app.post('/api/persons',(req,res)=>{
        const id=Math.max(...phonebook.map(person=>person.id))+1
        const sameName=phonebook.find(person=>person.name===req.body.name);
        if(sameName){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
        const sameNumber=phonebook.find(person=>person.number===req.body.number);
        if(sameNumber){
            return res.status(400).json({
                error: 'number must be unique'
            })
        }
        const person={
            name:req.body.name,
            number:req.body.number,
            id:id
        }
        phonebook=[...phonebook,person];
        res.json(person);
    })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)


const port = process.env.PORT|| 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
