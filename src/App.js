import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend when the component mounts
  useEffect(() => {
    axios.get("https://mern-10-keeper.onrender.com/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a note
  const addNote = (newNote) => {
    if (!newNote.title || !newNote.content) {
      alert("Both title and content are required!");
      return;
    }
    axios.post("https://mern-10-keeper.onrender.com/notes", newNote)
      .then((res) => setNotes((prevNotes) => [...prevNotes, res.data]))
      .catch((err) => console.error(err));
  };

  // Delete a note
  const deleteNote = (id) => {
    axios.delete(`https://mern-10-keeper.onrender.com/notes/${id}`)
      .then(() => setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Note 
            key={note._id} 
            id={note._id} 
            title={note.title} 
            content={note.content} 
            onDelete={deleteNote} 
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
