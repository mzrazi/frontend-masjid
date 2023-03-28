import React, {useState, useEffect} from "react";
import {Box, Button, TextField} from "@mui/material";
import Header from "components/Header";
import { useParams,useNavigate} from "react-router-dom";


const Edituser = () => {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Address,setAddress] = useState("");
   
    const [UserId, setUserId] = useState("");
    const navigate = useNavigate();
    const {id}=useParams()
    useEffect(() => {
        const fetchuser = async () => {
       
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/getuser/${id}`);
            const res= await response.json()
            const data=res.user
            console.log(data);
            
           
           
            setFirstName(data.FirstName);
            setLastName(data.LastName)
            setAddress(data.Address)
            setUserId(data._id);
            
        };
        fetchuser();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
       
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/edit-profile`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({FirstName,LastName,Address,UserId})
        }).then((response) => response.json()).then((data) => {
           
            navigate('/users');
        }).catch((error) => console.error(error));
    }
    

   
    

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="EDIT EVENT" subtitle="Edit an existing event"/>

            <div className="container mt-5">
                <form onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <div className="form-group">
                        <TextField label="First name" variant="outlined" name="First Name" 
                            value={FirstName}
                            onChange={
                                (event) => setFirstName(event.target.value)
                            }
                            required
                            fullWidth
                            margin="normal"
                            style={
                                {marginBottom: "1rem"}
                            }/>
                    </div>

                    <div className="form-group">
                        <TextField label="Last name" variant="outlined" name="Last Name" 
                            value={LastName}
                            onChange={
                                (event) => setLastName(event.target.value)
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
                        <TextField label="Address" variant="outlined" name="Address" 
                            value={Address}
                            onChange={
                                (event) => setAddress(event.target.value)
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




                
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>

                
            </div>
        </Box>
    );
};

export default Edituser;
