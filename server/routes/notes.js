const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const  fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE1: Get All notes using GET "/api/notes/fetchallnotes". Login required 
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occureed!");
    }
})

//ROUTE2: Add a new note using POST "/api/notes/addnote". Login required 
router.post('/addnote', fetchuser, [
    body('title','Enter a valid Title !').isLength({ min: 3 }),
    body('description','Description must be at least 5 characters').isLength({ min: 5 }),
] ,async(req,res)=>{

    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {title, description, tag} = req.body;
        const  note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occureed!");
    }
})

//ROUTE3: Update existing note using PUT "/api/notes/updatenote". Login required 
router.put('/updatenote/:id', fetchuser, [
    // body('title','Enter a valid Title !').isLength({ min: 3 }),
    // body('description','Description must be at least 5 characters').isLength({ min: 5 }),
] ,async(req,res)=>{

    //If there are errors, return Bad request and the errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try{
        const {title, description, tag} = req.body;

        //create new note object
        const  newNote = {};
        if({title}){newNote.title = title};
        if({description}){newNote.description = description};
        if({tag}){newNote.tag = tag};
        

        //find the note to be update and  update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        //Allows update if user owns  this note
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

        res.json(note);

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occureed!");
    }
})

//ROUTE4: Delete existing note using PUT "/api/notes/deleteenote". Login required 
router.delete('/deletenote/:id', fetchuser,async(req,res)=>{

    try{
        //find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        //Allows deletion if user owns  this note
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"Success":"Note has been deleted !"});

    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Error Occureed!");
    }
})

module.exports = router;