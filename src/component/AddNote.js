import React, { useContext, useState } from 'react';
import NoteContext from '../context/noteContext';
import { FaStickyNote, FaTags, FaPen } from 'react-icons/fa'; // Importing icons
import './AddNote.css'; // Importing updated custom CSS

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(NoteContext);
  const { addnewNote } = context;

  const handleClick = (e) => {
    e.preventDefault();
    addnewNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div className='note-container'>
      <div className='note-form'>
        <h1 className='note-heading'>Add a Note</h1>
        <form className='note-form-fields'>
          <div className="mb-3 input-group">
            <span className="input-group-text icon-container"><FaStickyNote /></span>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
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
              value={note.description}
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
              value={note.tag}
              onChange={onChange}
              placeholder="Enter note tag"
            />
          </div>
          <button
            disabled={note.description.length < 5 || note.title.length < 5}
            type="submit"
            className="btn custom-btn"
            onClick={handleClick}
            
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote;
