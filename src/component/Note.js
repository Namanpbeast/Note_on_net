import React, { useContext, useState, useEffect, useRef } from 'react';
import NoteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import { FaStickyNote, FaPen, FaTags } from 'react-icons/fa';
import './Note.css'; // Import custom CSS file

import AddNote from './AddNote';

const Note = () => {
  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
  const context = useContext(NoteContext);
  const { notes, getNote, updateNote } = context;
  const ref = useRef(null);
  const refCL = useRef(null);

  useEffect(() => {
    getNote();
  }, [getNote]);

  const updateClick = (oldNote) => {
    ref.current.click();
    setCurrentNote({
      id: oldNote._id,
      title: oldNote.title,
      description: oldNote.description,
      tag: oldNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (refCL.current) {
      refCL.current.click();
    }
    updateNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
    setCurrentNote({
      id: "",
      title: "",
      description: "",
      tag: ""
    });
  };
  

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote/>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title note-heading" id="exampleModalLabel">Update Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='note-form-fields'>
              <div className="mb-3 input-group">
                <span className="input-group-text icon-container"><FaStickyNote /></span>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentNote.title}
                  onChange={onChange}
                  placeholder="Enter note title"
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text icon-container"><FaPen /></span>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="description"
                  value={currentNote.description}
                  onChange={onChange}
                  placeholder="Enter note description"
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text icon-container"><FaTags /></span>
                <input
                  type="text"
                  className="form-control"
                  name="tag"
                  id="tag"
                  value={currentNote.tag}
                  onChange={onChange}
                  placeholder="Enter note tag"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refCL}
              disabled={currentNote.description.length < 5 || currentNote.title.length < 5} 
              type="button" 
              className="btn custom-btn" 
              onClick={handleClick}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>


      <div className='notes-container'>
        <h2 className='my-3'>Your Notes</h2>
        <div className='row'>
          {Array.isArray(notes) && notes.length === 0 && <p className='text-center'>No notes available. Add a note to get started!</p>}
          {Array.isArray(notes) && notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateClick={updateClick} />;
          })}
        </div>
      </div>

      
    </>
  );
};

export default Note;
