import React, { useRef, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState('https://');
  const [imageSize, setImageSize] = useState('medium');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSize, setVideoSize] = useState('large');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [linkUrl, setLinkUrl] = useState('https://');

  const getQuillInstance = useCallback(() => {
    if (quillRef.current) {
      return quillRef.current.getEditor();
    }
    return null;
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: { matchVisual: true }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent',
    'link', 'image', 'video', 'align', 'color', 'background', 'code-block'
  ];

  const handleAddLink = () => {
    setIsLinkDialogOpen(false);
    if (linkUrl.startsWith('http')) {
      const quill = getQuillInstance();
      if (quill) {
        const range = quill.getSelection(true);
        quill.formatText(range.index, range.length, 'link', linkUrl);
        toast.success('Link added!');
      }
    } else {
      toast.error('Enter valid URL');
    }
    setLinkUrl('https://');
  };

  const handleAddImage = () => {
    setIsImageDialogOpen(false);
    if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
      const quill = getQuillInstance();
      if (quill) {
        const sizeMap = { small: '300px', medium: '600px', large: '900px', full: '100%' };
        const style = `max-width: ${sizeMap[imageSize] || '600px'}; width: 100%; height: auto;`;
        const html = `<img src="${imageUrl}" alt="Image" style="${style}" />`;
        const range = quill.getSelection(true);
        quill.clipboard.dangerouslyPasteHTML(range.index, html);
        toast.success('Image added!');
      }
    } else {
      toast.error('Enter valid image URL');
    }
    setImageUrl('https://');
  };

  const handleAddVideo = () => {
    setIsVideoDialogOpen(false);
    if (videoUrl) {
      const quill = getQuillInstance();
      if (quill) {
        let embedUrl = videoUrl.includes('youtube.com/watch?v=') 
          ? videoUrl.replace('watch?v=', 'embed/') 
          : videoUrl;
        quill.insertEmbed(quill.getSelection().index, 'video', embedUrl);
        toast.success('Video added!');
      }
    } else {
      toast.error('Enter video URL');
    }
    setVideoUrl('');
  };

  const handleAddTable = () => {
    setIsTableDialogOpen(false);
    const tableHtml = `
      <table style="width:100%; border-collapse: collapse; margin: 1em 0;">
        <thead><tr>${Array(tableCols).fill('<th style="border:1px solid #ddd;padding:8px;background:#f5f5f5;">Header</th>').join('')}</tr></thead>
        <tbody>${Array(tableRows).fill().map(() => `<tr>${Array(tableCols).fill('<td style="border:1px solid #ddd;padding:8px;">Content</td>').join('')}</tr>`).join('')}</tbody>
      </table>
    `;
    const quill = getQuillInstance();
    quill.clipboard.dangerouslyPasteHTML(quill.getSelection().index, tableHtml);
    toast.success('Table added!');
  };

  return (
    <div className="w-full h-full rounded-2xl p-1">
      <style>{`
        .ql-container {
          font-size: 16px !important;
          border-radius: 1rem !important;
        }
        .ql-editor {
          min-height: 400px !important;
          color: #e5e7eb !important;
          font-family: 'Inter', sans-serif !important;
        }
        .ql-toolbar {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          background: #1e293b !important;
          border-color: #374151 !important;
        }
        .ql-toolbar button {
          color: #9ca3af !important;
        }
        .ql-toolbar button:hover {
          background: #374151 !important;
          color: white !important;
        }
        .ql-editor h1 { color: white !important; font-size: 2.5em !important; }
        .ql-editor h2 { color: white !important; font-size: 2em !important; }
        .ql-editor h3 { color: white !important; font-size: 1.5em !important; }
        .ql-editor blockquote {
          border-left: 4px solid #3b82f6 !important;
          background: #1e293b !important;
          padding-left: 1rem !important;
        }
        .ql-editor pre {
          background: #111827 !important;
          border: 1px solid #374151 !important;
        }
      `}</style>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing your content here..."
        className="h-full"
      />

      {/* Custom Toolbar Buttons */}
      <div className="custom-toolbar absolute top-2 right-2 flex gap-1 bg-slate-900/90 backdrop-blur-sm p-2 rounded-xl border border-slate-700 shadow-2xl z-50">
        <motion.button onClick={() => setIsLinkDialogOpen(true)} title="Link" whileHover={{ scale: 1.1 }}>
<svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 1 1 0 00.828 2.828z" />
          </svg>
        </motion.button>
        <motion.button onClick={() => setIsImageDialogOpen(true)} title="Image" whileHover={{ scale: 1.1 }}>
          <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        </motion.button>
        <motion.button onClick={() => setIsVideoDialogOpen(true)} title="Video" whileHover={{ scale: 1.1 }}>
          <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4z" />
          </svg>
        </motion.button>
        <motion.button onClick={() => setIsTableDialogOpen(true)} title="Table" whileHover={{ scale: 1.1 }}>
          <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5v1h10v-2H9v-1H4zm9-1H9V8h5v4z" />
          </svg>
        </motion.button>
      </div>

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 text-white p-6 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsLinkDialogOpen(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAddLink} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Insert Link</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {isImageDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 text-white p-6 rounded-2xl max-w-2xl w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white"
                >
                  <option value="small">Small (300px)</option>
                  <option value="medium">Medium (600px)</option>
                  <option value="large">Large (900px)</option>
                  <option value="full">Full Width</option>
                </select>
              </div>
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-full h-64 object-contain rounded-xl border border-slate-600 mt-4" />
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setIsImageDialogOpen(false); setImageUrl('https://'); }} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAddImage} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Insert Image</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Dialog */}
      {isVideoDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 text-white p-6 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Video URL (YouTube)</h3>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white mt-4"
            />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsVideoDialogOpen(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAddVideo} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Insert Video</button>
            </div>
          </div>
        </div>
      )}

      {/* Table Dialog */}
      {isTableDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 text-white p-6 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Table</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rows</label>
                <input type="number" value={tableRows} onChange={(e) => setTableRows(Number(e.target.value))} min="1" max="20" className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Columns</label>
                <input type="number" value={tableCols} onChange={(e) => setTableCols(Number(e.target.value))} min="1" max="10" className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsTableDialogOpen(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleAddTable} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">Create Table</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
