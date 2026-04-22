import React from 'react';
import { FileText, Image as ImageIcon, Download, Trash2 } from 'lucide-react';

export const FileList = ({ files, folderType, onDelete }) => {
  if (!files || files.length === 0) {
    return <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>No files found.</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
      {files.map((file) => (
        <div 
          key={file.fullPath} 
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {folderType === 'blueprint' ? (
            <div style={{ height: '100px', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <img src={file.url} alt={file.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
             <FileText size={64} color="#e53935" />
          )}
          
          <p style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-all', margin: '10px 0', flexGrow: 1 }}>{file.name}</p>
          
          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}>
            <a href={file.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
              <Download size={14} /> Open
            </a>
            {onDelete && (
                <button 
                  onClick={() => onDelete(file.fullPath)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#d32f2f' }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
