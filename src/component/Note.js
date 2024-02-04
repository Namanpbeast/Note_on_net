import React, { useContext, useState,useEffect, useRef } from 'react'
import NoteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'



const Note = () => {
  const [currentNote, setCurrentNote]=useState({id:"",title:"",description:"",tag:""})
  const context = useContext(NoteContext);
  const { notes, getNote,updateNote } = context;
  useEffect(() => {
    getNote();
  }, [])

  const ref=useRef(null);
  const refCL=useRef(null);

  const updateClick=(oldNote)=>{
    ref.current.click();
    setCurrentNote({
      id:oldNote._id,
      title:oldNote.title,
      description:oldNote.description,
      tag:oldNote.tag,
    });
  }

  const handleClick=(e)=>{
    e.preventDefault();

    refCL.current.click();
   updateNote(currentNote.id,currentNote.title,currentNote.description,currentNote.tag)
   setCurrentNote({
    id:"",
    title:"",
    description:"",
    tag:""
   })
  }

  const onChange=(e)=>{
    setCurrentNote({...currentNote,[e.target.name]:e.target.value})
  }

  return (
    <>
      <AddNote />

      
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
            <label htmlFor="title" className="form-label" >Title</label>
            <input type="text" className="form-control" value={currentNote.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3 flex">
            <label htmlFor="description" className="form-label" >Description</label>
            <input type="text" name="description" value={currentNote.description} className="form-control" id="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input type="text" className="form-control" value={currentNote.tag} name="tag" id="tag" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
  
      </div>
      <div className="modal-footer">
        <button type="button" ref={refCL} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={currentNote.description.length<5 ||currentNote.title.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
      </div>
    </div>
  </div>
</div>

      <h2 className='my-3'>Your Notes</h2>
      <div className='row'>
        <div>{notes.length===0 && "Enter the notes"}</div>
        
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateClick={updateClick} />;
        })}
      </div>
    </>
  )
}

export default Note
