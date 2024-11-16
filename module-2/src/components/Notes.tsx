import { useEffect, useState } from 'react';
import axios
 from 'axios'
 const baseUrl = '/api/notes';


 interface NoteProps {
    note: any;
    toggleImportance: () => void;
}
interface Notes {
    notes: any[]
}
const Note:React.FC<NoteProps> = ({note,toggleImportance}) => {
    const label = note.important
    ? 'make not important' : 'make important'
    return (
        <li>{note.content}
        <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}
export const Notes: React.FC<Notes> = ({notes}) => {
    
    const [theNotes,setTheNotes] = useState<any[]>([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true)
    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setTheNotes(response.data)
        })
    }, [])
 


    // const addNote = (event: any) => {
    //     event.preventDefault();
    //     const noteObject = {
    //         content: newNote,
    //         date: new Date().toISOString(),
    //         important: Math.random() > 0.5,
    //         // id: theNotes.length + 1,
    //     }
    //     axios.post('http://localhost:3001/notes', noteObject,{
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => {
    //         console.log(response)
    //         setTheNotes([...theNotes, noteObject]);
    //         setNewNote('');
    //     })     
    // }

    useEffect(() => {
        getAllNotes()
    }, [])
    const getAllNotes = () => {
        axios.get(baseUrl).then(response => {
            console.log("Get response",response)
            setTheNotes(response.data)
        })
    }
    const handleNoteChange = (event: any) => {
        event.preventDefault();
        setNewNote(event.target.value);
    }
    const toggleImportanceOf = (id:any) => {
        console.log(`importance of ${id} needs to be toggled`)
        const url = `http://localhost:3001/notes/${id}`;
        const note = theNotes.find(n => n.id === id)
        const changedNote = {
             ...note,
         important: !note.important 
        }
        axios.put(url, changedNote).then(response => {
            console.log("Put response",response)
            setTheNotes(theNotes.map(note => note.id !== id ? note : response.data))
        }
        )
      }
  return (
    <div>
      <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>  
      <ul>
        {theNotes.map((note:any) =>
        <Note key={note.id} toggleImportance={()=>toggleImportanceOf(note.id)} note={note} />
        )
        }
      </ul>
    </div>
    <form >
        <input type="text" onChange={handleNoteChange} value={newNote}/>
        <button type="submit">add note</button>
    </form>
    </div>
  );};
  export default Notes;