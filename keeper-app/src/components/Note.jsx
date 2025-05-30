import React from "react";

const Note = ({ id, title, content, onDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow-md relative">
    <h1 className="text-lg font-semibold">{title}</h1>
    <p className="text-sm">{content}</p>
    <button
      onClick={() => onDelete(id)}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      &#10005;
    </button>
  </div>
);

export default Note;
