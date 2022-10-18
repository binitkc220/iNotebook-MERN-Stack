import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""});
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        if(note.title.length>=3  && note.description.length>=5){
            addNote(note.title, note.description, note.tag);
            setNote({title: "", description: "", tag: ""});
            props.showAlert("Success","Note Added Successfully !", "fa-check-square","green");
        }
        else if(note.title.length<3)
        {
            props.showAlert("Error","Title must be atleast 3 character !", "fa-circle-xmark","red");
        }
        else if(note.description.length<5)
        {
            props.showAlert("Error","Description must be at least 5 character !", "fa-circle-xmark","red");
        }
    }

    const onChange = (e)=> {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
        
        <div className="container my-4 px-5">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Enter your title" id="title" name="title" onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Enter your description here" onChange={onChange} id="description" name="description" style={{height: "150px"}} value={note.description}></textarea>
                    </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Tag</label>
                    <input type="text" className="form-control" placeholder="general / personal / etc." id="tag" name="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
            </form>
            <br/><br/>
            <h2>Your Notes</h2>
        </div>
        </>
    )
}

export default AddNote
