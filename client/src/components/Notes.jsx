import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL, { authHeaders } from "../api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch notes
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/notes`, {
        headers: authHeaders(),
      })
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch notes. Try again later.");
      });
  }, []);

  // Add or Update Note
  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/notes/${editingId}`,
          {
            title,
            content,
          },
          {
            headers: authHeaders(),
          }
        );

        setNotes(
          notes.map((note) =>
            note._id === editingId
              ? { ...note, title, content }
              : note
          )
        );

        setEditingId(null);
      } else {
        const res = await axios.post(
          `${API_BASE_URL}/notes`,
          {
            title,
            content,
          },
          {
            headers: authHeaders(),
          }
        );

        setNotes([...notes, res.data.data]);
      }

      setTitle("");
      setContent("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error saving note. Please try again.");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`, {
        headers: authHeaders(),
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      setError("Error deleting note. Please try again.");
    }
  };

  // Edit note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    setError(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#EFE6D3] text-[#1C2230] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="border-b-2 border-[#1C2230] pb-4 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>
              <p className="ncf-mono text-xs tracking-[0.25em] text-[#C41230] mb-2">
                SECTION D
              </p>

              <h1 className="ncf-display text-4xl sm:text-5xl font-bold text-[#1C2230]">
                Smart Notes
              </h1>
            </div>

            <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/50 uppercase">
              Your personal newsroom notebook
            </p>

          </div>

        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="max-w-2xl mb-8">

          <p className="text-sm sm:text-base text-[#1C2230]/70 leading-relaxed">
            Capture important ideas, save your thoughts, and keep your
            newsroom notes organized in one place.
          </p>

        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 border border-[#C41230]/30 bg-[#F5EEDF] px-4 py-3 text-sm text-[#C41230]">
            {error}
          </div>
        )}

        {/* ================= NOTE EDITOR ================= */}
        <section className="border border-[#D8C9A3] bg-[#F5EEDF] shadow-sm">

          {/* Editor heading */}
          <div className="border-b border-[#D8C9A3] px-5 py-4 flex items-center justify-between">

            <div>
              <p className="ncf-mono text-[10px] tracking-[0.2em] text-[#C41230]">
                {editingId ? "EDITING NOTE" : "NEW NOTE"}
              </p>

              <h2 className="ncf-display text-xl font-bold text-[#1C2230] mt-1">
                {editingId ? "Update your note" : "Write something down"}
              </h2>
            </div>

            {editingId && (
              <button
                onClick={cancelEdit}
                className="text-sm font-semibold text-[#1C2230]/60 hover:text-[#C41230] transition-colors"
              >
                Cancel
              </button>
            )}

          </div>

          {/* Inputs */}
          <div className="p-5">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note headline"
              className="
                w-full
                bg-[#EFE6D3]
                border
                border-[#D8C9A3]
                px-4
                py-3
                text-[#1C2230]
                placeholder-[#1C2230]/40
                outline-none
                focus:border-[#1C2230]
                transition-colors
              "
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows="6"
              className="
                w-full
                mt-3
                bg-[#EFE6D3]
                border
                border-[#D8C9A3]
                px-4
                py-3
                text-[#1C2230]
                placeholder-[#1C2230]/40
                outline-none
                resize-y
                focus:border-[#1C2230]
                transition-colors
              "
            />

            <div className="flex justify-end mt-4">

              <button
                onClick={saveNote}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  bg-[#C41230]
                  text-[#EFE6D3]
                  font-semibold
                  tracking-wide
                  transition-all
                  duration-200
                  hover:bg-[#1C2230]
                "
              >
                {editingId ? "✏️ Update Note" : "＋ Add Note"}
              </button>

            </div>

          </div>
        </section>

        {/* ================= NOTES SECTION ================= */}
        <section className="mt-12">

          <div className="flex items-baseline justify-between border-b-2 border-[#1C2230] pb-3 mb-6">

            <h2 className="ncf-display text-black text-2xl sm:text-3xl font-bold">
  Your Notes
</h2>

            <span className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/50 uppercase">
              {notes.length} {notes.length === 1 ? "Note" : "Notes"}
            </span>

          </div>

          {/* ================= NOTES GRID ================= */}
          {notes.length === 0 ? (
            <div className="border border-[#D8C9A3] bg-[#F5EEDF] p-10 text-center">

              <p className="ncf-display text-xl font-semibold text-[#1C2230]">
                Your notebook is empty.
              </p>

              <p className="text-sm text-[#1C2230]/60 mt-2">
                Start writing your first note above.
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {notes.map((note) => (
                <article
                  key={note._id}
                  className="
                    group
                    bg-[#F5EEDF]
                    border
                    border-[#D8C9A3]
                    p-5
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >

                  {/* Note label */}
                  <div className="flex items-center justify-between mb-3">

                    <span className="ncf-mono text-[10px] tracking-[0.2em] text-[#C41230]">
                      NOTE
                    </span>

                    <span className="text-[#1C2230]/30">
                      ◆
                    </span>

                  </div>

                  {/* Title */}
                  <h3 className="ncf-display text-xl font-bold text-[#1C2230] break-words">
                    {note.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-10 border-t-2 border-[#C41230] my-3" />

                  {/* Content */}
                  <p className="text-sm text-[#1C2230]/70 leading-relaxed break-words whitespace-pre-wrap min-h-[80px]">
                    {note.content}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#D8C9A3]">

                    <button
                      onClick={() => editNote(note)}
                      className="
                        text-sm
                        font-semibold
                        text-[#1C2230]
                        hover:text-[#C41230]
                        transition-colors
                      "
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="
                        text-sm
                        font-semibold
                        text-[#C41230]
                        hover:text-[#1C2230]
                        transition-colors
                      "
                    >
                      🗑 Delete
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

        {/* ================= BOTTOM LINE ================= */}
        <div className="mt-12 pt-5 border-t border-[#D8C9A3] flex flex-col sm:flex-row justify-between gap-2">

          <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/40">
            NOTEBOOK DESK · NEWSCRAFT
          </p>

          <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/40">
            WRITE · SAVE · REMEMBER
          </p>

        </div>

      </div>
    </div>
  );
};

export default Notes;
