import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import axios from 'axios';

function ParentsRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        // Validate email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Please enter your email address";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid email address";
        }

        // Validate password
        if (!password) {
            formIsValid = false;
            errors["password"] = "Please enter your password";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phoneNumber", phoneNumber);
            formData.append("nationalID", nationalID);
            formData.append("name", name);

            try {
                const response = await axios.post("http://localhost:443/api/parent/register", formData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzeXN0ZW1AYm9zc2tpZHMubmV0IiwiaWF0IjoxNjgzNDM5MDU5LCJleHAiOjE2ODM0ODkwNTl9.Vn5orE-EfAQ7xfCLCG4g9L2ZzBwHkrPzutGuEn_CUjI`,
                    },
                });

                if (response.status === 200) {

                    alert("Logged in successfully!");
                } else {
                    alert("Failed to log in");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to log in");
            }
        }
    };

    return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader title="Create account" />
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="body1">Email Address</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={email}
                                        onChange={(mail) => setEmail(mail.target.value)}
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Password</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        value={password}
                                        onChange={(pass) => setPassword(pass.target.value)}
                                        error={errors.password ? true : false}
                                        helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Name</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={name}
                                        onChange={(nm) => setName(nm.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Phone Number</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(phone) => setPhoneNumber(phone.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">National ID</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={nationalID}
                                        onChange={(nid) => setNationalID(nid.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ParentsRegister;