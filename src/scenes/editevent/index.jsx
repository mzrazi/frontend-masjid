import React, {useState, useEffect} from "react";
import {Box, Button, TextField} from "@mui/material";
import Header from "components/Header";
import { useParams,useNavigate} from "react-router-dom";


const EditEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [imagePreview, setImagePreview] = useState("");
   
    const [eventId, setEventId] = useState("");
    const navigate = useNavigate();
    const {id}=useParams()
    useEffect(() => {
        const fetchEvent = async () => {
       
            const response = await fetch(`http://localhost:3000/admin/get-event/${id}`);
            const edit = await response.json()
            const data=edit.events
           
            setTitle(data.title);
            setDescription(data.description);
            setDate(data.date);
            setImagePreview(data.imagePath);
            setEventId(data._id);
            console.log(data.imagePath);
        };
        fetchEvent();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch(`http://localhost:3000/admin/update-event/${eventId}`, {
            method: "PUT",
            body: formData
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            navigate('/events');
        }).catch((error) => console.error(error));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        if (file) {
          reader.onload = (e) => {
            const image = e.target.result;
            setImagePreview(image);
          };
      
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
    };
    

   
    

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="EDIT EVENT" subtitle="Edit an existing event"/>

            <div className="container mt-5">
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
                                {marginBottom: "1rem"}
                            }/>
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
                                {marginBottom: "1rem"}
                            }/>
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
                                {marginBottom: "1rem"}
                            }/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Select an image:</label>
                        <br/>
                        <input type="file" className="form-control-file" id="file" name="image" accept="image/jpeg, image/jpg, image/png"
                            onChange={handleImageChange}
                            style={
                                {marginBottom: "1rem"}
                            }/>
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
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>

                
            </div>
        </Box>
    );
};

export default EditEvent;
