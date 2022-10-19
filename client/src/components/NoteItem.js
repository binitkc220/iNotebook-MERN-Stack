import React from 'react'

const NoteItem = (props) => {
    const { note, updateNote, deleteTheNote } = props;
    return (
        <>
            <div className="col-md-4">
                <div className="card card-shadow m-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-end">
                            <i className="fa-solid fa-pen-to-square mx-2 text-primary show-pointer" onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash-can mx-2 text-danger show-pointer" onClick={() => { deleteTheNote(note) }}></i></div>
                        <div className="mr-auto p-2"><h5 className="card-title">{note.title}</h5></div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
