import React, { useContext, useState } from 'react'

import NoteContext from '../context/noteContext'

const AddNote = () => {
    const [note, setNote]=useState({title:"",description:"",tag:""})
    const context = useContext(NoteContext);
    const { addnewNote } = context;
  
    const handleClick=(e)=>{
      e.preventDefault();
      
      addnewNote(note.title,note.description,note.tag);
      setNote({title:"",description:"",tag:""})
    }
  
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
     
    }
    return (
  
      <div className='Note Input'>
        <form>
          <h1>Add a note</h1>
          <div className="mb-3">
            <label htmlFor="title" className="form-label" >Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3 flex">
            <label htmlFor="description" className="form-label" >Description</label>
            <input type="text" name="description" className="form-control" id="description" value={note.description} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" aria-describedby="emailHelp" value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.description.length<5 ||note.title.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
  
      </div>
    )
}

export default AddNote



