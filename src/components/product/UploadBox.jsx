import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import './UploadBox.css'; // Just mapping to standard css for them

export const UploadBox = ({ onUpload, accept, maxFiles = 10 }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    setIsUploading(true);
    try {
      await onUpload(acceptedFiles);
    } finally {
      setIsUploading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles
  });

  return (
    <div 
      {...getRootProps()} 
      className={`upload-box ${isDragActive ? 'active' : ''} ${isUploading ? 'loading' : ''}`}
      style={{
        border: '2px dashed #ccc', 
        padding: '20px', 
        textAlign: 'center', 
        borderRadius: '8px',
        cursor: isUploading ? 'not-allowed' : 'pointer',
        backgroundColor: isDragActive ? '#e3f2fd' : '#f9f9f9',
        transition: 'all 0.2s ease'
      }}
    >
      <input {...getInputProps()} disabled={isUploading} />
      <UploadCloud size={40} color="#888" style={{ marginBottom: '10px' }} />
      {isUploading ? (
        <p>Uploading files...</p>
      ) : isDragActive ? (
        <p>Drop files here...</p>
      ) : (
        <p>Drag & drop {accept ? Object.keys(accept).join(', ') : 'files'} here, or click to select</p>
      )}
    </div>
  );
};
