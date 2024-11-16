const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  app.post('/api/notes',(req,res)=>{
    if (!req.body.content) {
        return res.status(400).json({
          error: 'content missing'
        })
      }
  
    const id=Math.floor(Math.random()*10000);
    const note={
        content:req.body.content,
        important:req.body.important||false,
        id:id
    }
    notes=notes.concat(note);
    res.json(note);
  })
  app.get('/api/notes/:id',(req,res)=>{
    const id=req.params.id;
    const note=notes.find(note=>note.id===id);
    if(note){
        res.json(note);
    }else{
        res.status(404).end();
    }
    })
  app.delete('/api/notes/:id',(req,res)=>{
    const id=req.params.id;
    notes=notes.filter(note=>note.id!==id)
    res.status(204).end();
  })
  app.get('/',(req,res)=>{ 
    res.send('<h1>Hello World</h1>');
  })

  app.get('/api/notes',(req,res)=>{
        res.json(notes);
    })
const Port=3001;
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})


