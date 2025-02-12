import { useState } from 'react';
import { Smile, Meh, Frown, Tag, Calendar, Edit2, Trash2 } from 'lucide-react';
import type { DiaryEntry } from '../types';

interface Props {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

const moodIcons = {
  happy: Smile,
  neutral: Meh,
  sad: Frown,
};

export default function DiaryEntry({ entry, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(entry.content);
  const MoodIcon = moodIcons[entry.mood];

  const handleSave = () => {
    onEdit(entry.id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{entry.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <MoodIcon className={`w-5 h-5 ${entry.mood === 'happy' ? 'text-green-500' : entry.mood === 'sad' ? 'text-red-500' : 'text-yellow-500'}`} />
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(entry.id)} className="text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
      )}

      {entry.tags.length > 0 && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-gray-500" />
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}