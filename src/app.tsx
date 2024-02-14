import { ChangeEvent, useState } from "react";
import { NewNoteCard } from "./components/newNoteCard/new-note-card";
import { NoteCard } from "./components/noteCard/note-card";
import { Notes } from "./components/noteCard/type";

export function App() {
  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState<Notes[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  const filteredNotes = search
    ? notes.filter((filterNote) =>
        filterNote.content
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
    : notes;

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    console.log(event.target.value);
  }

  function onNoteCreated(content: string) {
    const newNote = {
      note: {
        id: crypto.randomUUID(),
        date: new Date(),
        content,
      },
    };
    const newNotes: Notes[] = [newNote.note, ...notes];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function onNoteDeleted(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-400 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-600" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          );
        })}
      </div>
    </div>
  );
}
