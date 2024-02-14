export interface NoteCardProps {
  note: Notes;
  onNoteDeleted: (id: string) => void;
}

export interface Notes {
  id: string;
  date: Date;
  content: string;
}
