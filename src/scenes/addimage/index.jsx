import React, { useState } from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    marginTop: "5rem",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    marginBottom: "0.5rem",
    display: "block",
    fontSize: "1.2rem",
  },
  previewImage: {
    maxWidth: "200px",
    marginTop: "1rem",
  },
  submitButton: {
    marginTop: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
};

const Addimage = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreviewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("http://localhost:3000/admin/save-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Image Upload Form
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="file" style={styles.label}>
              Select an image:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handlePreviewImage}
            />
          </div>
          {previewImage && (
            <div style={{ textAlign: "center" }}>
              <img src={previewImage} alt="Preview" style={styles.previewImage} />
            </div>
          )}
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addimage;

