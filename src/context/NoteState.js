import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState=(props)=>{
    const host="http://localhost:5000";
    const noteInitial=[]
    const [notes,setNotes]=useState(noteInitial);

    const [alert,setAlert]=useState(false);
    const [type,setType]=useState("");
    const [message,setMessage]=useState("");


    //SignUp
    const signup=async(name,email,password)=>{
      const response = await fetch(`${host}/api/auth/create`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
           },
        body:JSON.stringify({name,email,password})
      });
      const result=await response.json();
      console.log(result);
      return (result);
    }

    //login section
    const login=async(email,password)=>{
     
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
           },
        body:JSON.stringify({email,password})
      });
      const result=await response.json();
      console.log(result);
      return (result);
      
    }
    
    //get all notes
    const getNote=async()=>{
             
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const result=await response.json();

        setNotes(result);
    }
   
    //Add Note
    const addnewNote=async(title,description,tag)=>{
             
        const response = await fetch(`${host}/api/notes/postnotes`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const result=await response.json();
        setNotes(notes.concat(result))
    }

    //Delete Note
    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          },
      });
        const newNote=notes.filter((note)=>{
            return (note._id!==id);
        })
        setNotes(newNote)
    }

    //Update Note
    const updateNote=async(id,title,description,tag)=>{
  
        const response = await fetch(`${host}/api/notes/update/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
           },
          body: JSON.stringify({title,description,tag}), 
        });
        

        const newNote=JSON.parse(JSON.stringify(notes));
        for(let i=0;i<notes.length;i++){
          let current=notes[i];
           if(current._id===id){
            newNote[i].title=title;
            newNote[i].description=description;
            newNote[i].tag=tag;
            break;
           }
          
        }
       
        setNotes(newNote)
    }

    return( 
        <NoteContext.Provider value={{notes,setNotes,alert,setAlert,message,setMessage,type,setType,addnewNote,deleteNote,updateNote,getNote,login,signup}}>
            {props.children}
        </NoteContext.Provider>
       )
};
export default NoteState;




    
   
