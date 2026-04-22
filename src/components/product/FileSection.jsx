import React, { useState, useEffect } from 'react';
import { UploadBox } from './UploadBox';
import { FileList } from './FileList';
import { getFilesList, uploadFile, deleteFile } from '../../services/storageService';

export const FileSection = ({ title, customerName, productName, folderType, acceptRules }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const result = await getFilesList(customerName, productName, folderType);
      setFiles(result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [customerName, productName, folderType]);

  const handleUpload = async (acceptedFiles) => {
    try {
      const uploadPromises = acceptedFiles.map(file => 
        uploadFile(customerName, productName, folderType, file)
      );
      await Promise.all(uploadPromises);
      fetchFiles(); // Refresh list after upload
    } catch (err) {
      console.error("Upload failed", err);
      alert('Upload failed: ' + err.message);
    }
  };

  const handleDelete = async (fullPath) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(fullPath);
        fetchFiles();
      } catch (err) {
        console.error("Delete failed", err);
        alert('Delete failed');
      }
    }
  };

  return (
    <div className="file-section" style={{ border: '1px solid #eee', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', marginBottom: '20px' }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>{title}</h3>
      <UploadBox onUpload={handleUpload} accept={acceptRules} />
      
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading files...</div>
      ) : error ? (
        <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
      ) : (
        <FileList files={files} folderType={folderType} onDelete={handleDelete} />
      )}
    </div>
  );
};
