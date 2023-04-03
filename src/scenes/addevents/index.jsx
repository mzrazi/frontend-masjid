import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "components/Header";
import CustomAlertBox from "components/customAlertBox"

const AddEvents = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/save-event`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage("Form submitted successfully");
        setAlertType("success");
        setTimeout(() => {
            setAlertMessage("");
            setAlertType("");
        }, 6000);
        setTitle("");
        setDescription("");
        setDate("");
        setImagePreview("");
        event.target.image.value = ""
        
      })
      .catch((error) => {
        setAlertMessage("Error submitting form");
        setAlertType("error");
        setTimeout(() => {
            setAlertMessage("");
            setAlertType("");
        }, 6000);
        setTitle("");
        setDescription("");
        setDate("");
        setImagePreview("");
        event.target.image.value = ""
        
        console.error(error);
      });
  };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file);
    };
    const handleCloseAlert = () => {
        setAlertMessage("");
        setAlertType("");
      };

    return (




        <Box m="1.5rem 2.5rem">
            <Header title="ADD EVENTS" subtitle="Add events to the database"/>

           

            <div className="container mt-5">
        {alertMessage && (
          <CustomAlertBox
            message={alertMessage}
            type={alertType}
            onClose={handleCloseAlert}
          />
        )}


                <form onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <div className="form-group">
                        <TextField label="Title" variant="outlined" name="title" placeholder="Enter Title"
                            value={title}
                            onChange={
                                (event) => setTitle(event.target.value)
                            }
                            required
                            fullWidth
                            margin="normal"
                            style={
                                {marginBottom: '1rem'}
                            }
                            // Add margin to the bottom
                        />
                    </div>

                    <div className="form-group">
                        <TextField label="Description" variant="outlined" name="description" placeholder="Enter Description"
                            value={description}
                            onChange={
                                (event) => setDescription(event.target.value)
                            }
                            required
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            style={
                                {marginBottom: '1rem'}
                            }
                            // Add margin to the bottom
                        />
                    </div>

                    <div className="form-group">
                        <TextField variant="outlined" name="date" type="date"
                            value={date}
                            onChange={
                                (event) => setDate(event.target.value)
                            }
                            required
                            fullWidth
                            margin="normal"
                            style={
                                {marginBottom: '1rem'}
                            }
                            // Add margin to the bottom
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Select an image:</label>
                        <br/>
                        <input type="file" className="form-control-file" id="file" name="image" accept="image/jpeg, image/jpg, image/png"
                            onChange={handleImageChange}
                            required
                            style={
                                {marginBottom: '1rem'}
                            }
                            // Add margin to the bottom
                        />
                    </div>

                    <div className="form-group text-center">
                        {
                        imagePreview && (
                            <img id="preview"
                                src={imagePreview}
                                alt="Preview"
                                className="img-fluid"
                                style={{ maxWidth: "200px" }}/>
                        )
                    } </div>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>

            </div>
        </Box>
    );
};

export default AddEvents;
