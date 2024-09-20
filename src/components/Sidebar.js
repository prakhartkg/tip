import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles, selectFile } from '../store/fileSlice'; // Ensure this path is correct
import axios from 'axios';
import './Sidebar.css'; // Ensure this file exists and is properly linked

function Sidebar() {
  const dispatch = useDispatch();
  const { files, selectedFile, status, error } = useSelector((state) => state.files);
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const uploadRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector('.footer');
    const footerHeight = footer ? footer.offsetHeight : 0;
    if (uploadRef.current) {
      uploadRef.current.style.marginBottom = `${footerHeight}px`;
    }
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleFileSelect = (fileId) => {
    dispatch(selectFile(fileId));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileToUpload(file);
      handleFileUpload(file);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/delete_pdf/${fileId}`);
      dispatch(fetchFiles()); // Refresh the file list
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(fetchFiles());
      setFileToUpload(null); // Clear file input
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="sidebar d-flex flex-column p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="sidebar-heading mb-0">Contracts</h5>
        <label htmlFor="fileInput" className="btn upload-button">
          <i className="fa fa-upload" aria-hidden="true"></i> {/* Changed to upload icon */}
             Upload Contracts
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          disabled={uploading}
          className="d-none"
        />
      </div>
      {status === 'loading' && <div className="text-center">Loading files...</div>}
      {error && <div className="text-center text-danger">Error: {error}</div>}
      <ul className="file-tree">
        {files.map((file) => (
          <li key={file.id} className="file-item">
            <span
              className={`file-name ${file.id === selectedFile ? 'active' : ''}`}
              onClick={() => handleFileSelect(file.id)}
            >
              {file.name}
            </span>
            <button 
              className="btn btn-link text-danger" 
              onClick={() => handleFileDelete(file.id)}
              title="Delete File"
            >
              <i className="fa fa-trash" aria-hidden="true"></i> {/* Trash icon */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
