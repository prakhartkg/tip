import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles, selectFile, deleteFile } from '../store/fileSlice'; // Ensure this path is correct
import axios from 'axios';
import './Sidebar.css'; // Ensure this file exists and is properly linked
import { FaTrash } from 'react-icons/fa'; // Import Font Awesome trash icon

function Sidebar() {
  const dispatch = useDispatch();
  const { files, selectedFile, status, error } = useSelector((state) => state.files);
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);


  const handleFileSelect = (fileId) => {
    dispatch(selectFile(fileId));
  };

  const handleFileChange = (event) => {
    setFileToUpload(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', fileToUpload);

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
      <h5 className="mb-3">Files</h5>
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
          </li>
        ))}
      </ul>
      <div className="upload-section mt-3">
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="form-control mb-2"
        />
        <button
          className="btn btn-primary w-100"
          onClick={handleFileUpload}
          disabled={uploading || !fileToUpload}
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
