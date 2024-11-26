import React, { useState } from "react";
import { X } from "lucide-react";
import { Event } from "../types";

interface EventModalProps {
  selectedDate: Date | null;
  onClose: () => void;
  onAdd: (event: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !title) return; 

    onAdd({
      title,
      description,
      date: selectedDate.toISOString(),
    });
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow w-full max-w-md p-5">
        {/* Modal sarlavhasi */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Add Event</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="text"
              value={selectedDate?.toLocaleDateString() || ""}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-50"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
