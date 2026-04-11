import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteConfirmation = ({ isOpen, onOpenChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">Confirm Delete</h2>
            <p className="text-slate-400 text-sm mt-1">
              This action cannot be undone. This will permanently delete the content and remove it from our database.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 h-12 px-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Forever
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
