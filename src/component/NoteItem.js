import React, { useContext } from 'react'

import NoteContext from '../context/noteContext';

const NoteItem = (props) => {
  const { note, updateClick } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const update = () => {
    updateClick(note);
  }


  return (
    <div className="col-md-3 mx-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash " onClick={() => deleteNote(note._id)}></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={update}></i>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
