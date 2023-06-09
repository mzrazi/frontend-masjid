import React, {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import "./gallery.css";
import {Link} from "react-router-dom";
import Header from "components/Header";
import CustomAlertBox from "components/customAlertBox";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gallery`);
                const data = await res.json();
                
                setImages(data.images);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/imagedelete/${id}`, {method: "DELETE"});
            setAlert({ message: "image deleted successfully", type: "success" });
         
            setImages((prevImages) => prevImages.filter((image) => image._id !== id));
        } catch (error) {
            setAlert({ message: "Error deleting image", type: "error" });
            console.error(error);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GALLERY"/>
            <Box mt="40px">

            {alert && ( // Render the alert message if it exists
          <CustomAlertBox
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link className="linkbutton" to="/addimage">
                        <Button variant="contained" color="primary">
                            Add image
                        </Button>
                    </Link>
                </div>

                {
                images.length === 0 ? (
                    <p style={
                        {textAlign: "center"}
                    }>No images to display</p>
                ) : (
                    <div className="gallery">
                        {
                        images.map((image) => (
                          
                            <div key={
                                image._id
                            }>
                                <div className="imagerow">
                                    <div className="card mb-4">
                                        <img className="card-img-top"
                                            src={
                                                image.imagePath
                                            }
                                            alt="img"
                                            style={
                                                {
                                                    height: "200px",
                                                    width: "250px"
                                                }
                                            }/>
                                        <div className="card-body">
                                            <Button variant="contained" color="primary"
                                                onClick={
                                                    () => {
                                                        if (window.confirm("Are you sure you want to delete this image?")) {
                                                            handleDelete(image._id);
                                                        }
                                                    }
                                            }>
                                                Delete
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    } </div>
                )
            } </Box>
        </Box>
    );

};

export default Gallery;
