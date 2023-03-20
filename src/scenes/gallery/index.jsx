import React, {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import "./gallery.css";
import {Link} from "react-router-dom";
import Header from "components/Header";

const Gallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("http://localhost:3000/gallery");
                const data = await res.json();
                console.log(data);
                setImages(data.images);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/admin/imagedelete/${id}`, {method: "DELETE"});

            setImages((prevImages) => prevImages.filter((image) => image._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GALLERY"/>
            <Box mt="40px">
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
