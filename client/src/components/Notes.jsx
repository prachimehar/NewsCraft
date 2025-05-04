import { useState, useEffect } from "react";
import axios from "axios";

// Define the base URL for your deployed backend
const apiUrl = "https://newscraft.onrender.com/notes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch notes from the backend
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setNotes(res.data.data))
      .catch((err) => setError("Failed to fetch notes. Try again later."));
  }, []);

  // Add or update a note
  const saveNote = async () => {
    if (!title || !content) {
      setError("Title and content are required!");
      return;
    }

    try {
      if (editingId) {
        // Update existing note
        await axios.put(`${apiUrl}/${editingId}`, { title, content });
        setNotes(
          notes.map((note) =>
            note._id === editingId ? { ...note, title, content } : note
          )
        );
        setEditingId(null);
      } else {
        // Add new note
        const res = await axios.post(apiUrl, { title, content });
        setNotes([...notes, res.data.data]);
      }
      setTitle("");
      setContent("");
      setError(null);
    } catch (err) {
      setError("Error saving note. Please try again.");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError("Error deleting note. Please try again.");
    }
  };

  // Edit a note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mt-5 font-bold text-center mb-6">📝 Notes</h2>

      {/* Error Message */}
      {error && (
        <div className="text-center bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white bg-[#FFA07A] text-black p-4 rounded-lg shadow-md">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-black p-2 mb-2 border border-gray-300 rounded bg-white"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          className="w-full text-black p-2 mb-2 border border-gray-300 rounded bg-white"
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={saveNote}
            className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 transform ${
              editingId
                ? "bg-[#FF3B30] hover:bg-[#D32F2F] hover:shadow-blue-500/50"
                : "bg-[#FF3B30] hover:bg-[#D32F2F] hover:shadow-red-500/50"
            } text-white hover:scale-105`}
          >
            {editingId ? "✏️ Update Note" : "➕ Add Note"}
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3">
            No notes yet. Start adding some!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="p-4 rounded-lg shadow-lg border border-gray-300 w-full break-words"
              style={{ backgroundColor: getRandomColor() }}
            >
              <h3 className="text-lg font-semibold text-black truncate">
                {note.title}
              </h3>
              <p className="text-black mt-2 overflow-hidden break-words">
                {note.content}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editNote(note)}
                  className="bg-[#FF7F7F] text-white px-2 py-1 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:bg-[#D32F2F] hover:scale-105 hover:shadow-blue-500/50"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-[#FF7F7F] text-white px-2 py-1 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:bg-[#D32F2F] hover:scale-105 hover:shadow-red-500/50"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;

