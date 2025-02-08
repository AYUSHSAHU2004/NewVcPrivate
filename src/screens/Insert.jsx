import React, { useState } from "react";
import axios from "axios";

const Insert = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle name and showName input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleShowNameChange = (event) => {
    setShowName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !name || !showName) {
      setResponseMessage("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("mp3File", file);
    formData.append("name", name);
    formData.append("showName", showName);

    try {
      // Send the file and form data to the backend (change URL to your backend endpoint)
      const response = await axios.post("http://localhost:8001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Tell the server we're sending a file
        },
      });

      // Success: display the response message
      setResponseMessage("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      // Handle error
      setResponseMessage("Error uploading the file.");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upload MP3 File</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="mp3File" style={styles.label}>Select MP3 File:</label>
          <input
            type="file"
            id="mp3File"
            name="mp3File"
            accept="audio/mp3"
            onChange={handleFileChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="showName" style={styles.label}>Show Name:</label>
          <input
            type="text"
            id="showName"
            name="showName"
            value={showName}
            onChange={handleShowNameChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Upload</button>
      </form>

      {/* Display response message */}
      {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #f8c9d2, #f3c6d4)", // Romantic pinkish gradient
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  header: {
    color: "#4a3c3a",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "1.2rem",
    color: "#4a3c3a",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "1.2rem",
    backgroundColor: "#ff6b81",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#ff4e5b",
  },
  responseMessage: {
    fontSize: "1.1rem",
    color: "#4caf50", // Green color for success
    fontWeight: "bold",
  },
  // Media Query for Mobile Devices
  '@media (max-width: 768px)': {
    header: {
      fontSize: "2rem",
    },
    form: {
      padding: "20px",
      maxWidth: "90%",
    },
    input: {
      padding: "8px",
    },
    button: {
      fontSize: "1rem",
      padding: "10px",
    },
  },
};

export default Insert;
