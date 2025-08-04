import React from "react";

export default function SlotPicker({ slots, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {slots.map(slot => (
        <button
          key={slot.id}
          onClick={() => onSelect(slot)}
          className="p-2 rounded-lg bg-blue-500 text-white"
        >
          {new Date(slot.start_time).toLocaleString()}
        </button>
      ))}
    </div>
  );
}

