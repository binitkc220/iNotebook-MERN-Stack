import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else
    {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const refedit = useRef(null);
  const refclose = useRef(null);
  const refdelete = useRef(null);
  const refdeleteclose = useRef(null);

  const updateNote = (currentNote) => {
    refedit.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const handleUpdateSubmit = (e) => {
    // console.log("Updating the note...", note);
    if (note.etitle.length < 3) {
      props.showAlert("Error", "Title must be atleast 3 character !", "fa-circle-xmark", "red");
      return;
    }
    else if (note.edescription.length < 5) {
      props.showAlert("Error", "Description must be atleast 5 character !", "fa-circle-xmark", "red");
      return;
    }
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Success", "Note Updated Successfully !", "fa-check-square", "green");
    refclose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const deleteTheNote = (noteToDelete) => {
    refdelete.current.click();
    setNote({ id: noteToDelete._id, etitle: noteToDelete.title, edescription: noteToDelete.description });
  }

  const handleDeleteSubmit = (e) => {
    // console.log("Deleting the note...", note);
    deleteNote(note.id);
    props.showAlert("Success", "Note Deleted Successfully !", "fa-check-square", "green");
    refdeleteclose.current.click();
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      {/* -- Button trigger edit modal box -- */}
      <button type="button" ref={refedit} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModalBox">
        Launch Edit Modal Box
      </button>

      {/* -- Edit Modal Box -- */}
      <div className="modal fade" id="editModalBox" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" placeholder="Enter your title" id="etitle" name="etitle" onChange={onChange} value={note.etitle || ''} minLength={3} required />
                  {/* value = {note.etitle || ''}.. here || '' is added to fix A component is changing an uncontrolled input to be controlled warning
                  This warning ccurs when an input value is initialized to undefined but is later changed to a different value. To fix the warning, initialize the input value to an empty string.  */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Enter your description here" onChange={onChange} id="edescription" name="edescription" value={note.edescription || ''} style={{ height: "150px" }} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Tag</label>
                  <input type="text" className="form-control" placeholder="general / personal / etc." id="etag" name="etag" onChange={onChange} value={note.etag || ''} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* -- Button trigger delete modal box -- */}
      <button type="button" ref={refdelete} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModalBox">
        Launch Delete Modal Box
      </button>

      {/* -- Edit Modal Box -- */}
      <div className="modal fade" id="deleteModalBox" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">Are you sure to delete this note?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h5>{note.etitle}</h5><br />
              <p>{note.edescription}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDeleteSubmit}>Yes</button>
              <button ref={refdeleteclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>


      <div className='container'>
        <div className="row my-3">
          <div className='container px-5'>
            <h5>
              {notes.length === 0 && 'No notes to display :('}
            </h5>
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} deleteTheNote={deleteTheNote} note={note} />;
          })}
        </div>
      </div>
    </>
  )
}
