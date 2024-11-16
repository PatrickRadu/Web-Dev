
import { useState } from 'react'

const Phonebook = () => {
  const [persons, setPersons] = useState<any[]>([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
    const onSubmitPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (persons.some(person => areObjectsEqual(person, { name: newName }))) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons([...persons, { name: newName, number: newNumber }])
        setNewName('')
        setNewNumber('')
    }
    function areObjectsEqual(obj1: any, obj2: any) {
        if ((obj1 === null || obj2 === null) || (obj1 === undefined || obj2 === undefined)) {
            return false
        }
        if (obj1.constructor !== obj2.constructor) {
            return false
        }

        for (const key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false
            }
        }
        return true
    }
    const OnNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewNumber(event.target.value)
    }
    const Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFilter(event.target.value)
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <input value={filter} onChange={Change}></input>
      <form onSubmit={onSubmitPerson}>
        <div>
          name: <input value={newName} onChange={onInputChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={OnNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => {if (filter==='' || person.name.toString().includes(filter)) return<div key={person.name}>{person.name} {person.number}</div>})
      }
    </div>
  )
}

export default Phonebook