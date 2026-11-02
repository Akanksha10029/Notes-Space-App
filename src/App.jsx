import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [heading, setHeading] = useState('');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {

      if (!heading.trim() || !details.trim()) {
          return;
      }

      if (editingId !== null) {
          // UPDATE EXISTING NOTE
          setNotes(prev => {
              return prev.map(note => {
                  if (note.id === editingId) {
                      return {
                          ...note,
                          heading: heading,
                          details: details
                      };
                  }
                  return note;
              });
          });

      } else {
          // ADD NEW NOTE
          const newNote = {
              id: Date.now(),
              heading: heading,
              details: details
          };
          setNotes(prev => [...prev, newNote]);
      }

      // CLEAR THE FORM
      setHeading('');
      setDetails('');
      setEditingId(null);
  };

  const editNote = (note) => {
    setHeading(note.heading);
    setDetails(note.details);
    setEditingId(note.id);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => {
        return prevNotes.filter(note => note.id !== id);
    });
  };
  
  return (
    <>
    <div className="notes-app">

      {/* Left Section: Create Note */}
      <aside className="notes-sidebar">

        <div className="app-brand">
          <div className="brand-icon">N</div>
          <span>Notespace</span>
        </div>

        <div className="form-heading">
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h1>Create a note</h1>
          <p className="subtitle">
            Capture your thoughts before they slip away.
          </p>
        </div>

        <form className="note-form">
          <div className="form-group">
            <label htmlFor="note-heading">Note heading</label>
            <input
              type="text"
              id="note-heading"
              placeholder="Enter notes heading"
              value={heading}
              onChange={(e)=>{setHeading(e.target.value)}}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note-details">Note details</label>
            <textarea
              id="note-details"
              placeholder="Write your thoughts here..."
              rows="7"
              value={details}
              onChange={(e)=>{setDetails(e.target.value)}}
            />
          </div>

          <button
              type="button"
              className="add-note-btn"
              onClick={addNote}
          >
              {editingId !== null ? 'Update Note' : 'Add Note'}
          </button>

          {editingId !== null && (
            <button
                type="button"
                onClick={() => {
                    setHeading('');
                    setDetails('');
                    setEditingId(null);
                }}
            >
                Cancel Edit
            </button>

        )}

        </form>

        <p className="sidebar-footer">
          A little space for everything on your mind.
        </p>

      </aside>


      {/* Right Section: Display Notes */}
      <main className="notes-content">

        <header className="notes-header">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>Your notes</h2>
            <p className="subtitle">
              All your thoughts, in one place.
            </p>
          </div>

          <div className="notes-count">
            <span className="count-number">{notes.length}</span>
            <span className="count-label">Notes</span>
          </div>
        </header>


        {/* Notes Grid */}
        <section className="notes-grid">
            {notes.map((note) => {
                return (
                    <article className="note-card" key={note.id}>
                        <div className="note-card-top">
                            <span className="note-category">
                                MY NOTE
                            </span>
                        </div>

                        <h3>{note.heading}</h3>

                        <p className="note-description">
                            {note.details}
                        </p>


                        <div className="note-card-footer">
                            <span className="note-date">
                                My notes
                            </span>
                        </div>
                        <button
                            type="button"
                            className="edit-note-btn"
                            onClick={() => editNote(note)}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="delete-note-btn"
                            onClick={() => deleteNote(note.id)}
                        >
                            Delete
                        </button>

                    </article>
                );
            })}
        </section>

      </main>

    </div>
    </>
  )
}

export default App
