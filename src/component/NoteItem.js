import React, { useContext } from 'react';
import NoteContext from '../context/noteContext';
import './NoteItem.css';  // Import the CSS file

const NoteItem = (props) => {
  const { note, updateClick } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const update = () => {
    updateClick(note);
  }

  return (
    <div className="col-md-3 mx-3 my-3">
      <div className="card note-card">
        <div className="card-body note-card-body">
          <h5 className="note-title">{note.title}</h5>
          <div className="note-icons">
            <i 
              className="fa-solid fa-trash note-icon-trash" 
              onClick={() => deleteNote(note._id)}
            ></i>
            <i 
              className="fa-solid fa-pen-to-square note-icon-edit" 
              onClick={update}
            ></i>
          </div>
          <p className="note-description">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
