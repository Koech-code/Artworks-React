import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography,
    Link
} from '@material-ui/core';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        height: '100vh',
        paddingLeft: '200px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
        },

    },
}));



function CustomerRegister() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nationalIdCard, setNationalIdCard] = useState("");
    const [location, setLocation] = useState("");
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

        // Validate name
        if (!name) {
            formIsValid = false;
            errors["name"] = "Please enter your name";
        }

        // validate phone number
        if (!phoneNumber) {
            formIsValid = false;
            errors["phoneNumber"] = "Please enter your phone number";
        } else if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
            formIsValid = false;
            errors["phoneNumber"] = "Please enter a valid phone number starting with '+' and followed by a country code and phone number";
        }


        setErrors(errors);
        return formIsValid;
    };
    const handleRegister = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phoneNumber", phoneNumber);
            formData.append("nationalIdCard", nationalIdCard);
            formData.append("name", name);

            try {
                const response = await axios.post(
                    "https://3.83.201.151:7000/api/customer/user-register",
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const customerId = response.data.customer.customerId;
                    toast.success("Your account has been created successfully!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    // Wait for a brief moment to allow the account creation to finish
                    await new Promise((resolve) => setTimeout(resolve, 6000));

                    // Fetch the user's account using the customer ID
                    const accountResponse = await axios.get(`https://3.83.201.151:7000/api/accounts/account/user/${customerId}`);
                    const account = accountResponse.data;

                    if (account) {
                        const accountId = account.id;
                        // Do something with the accountId

                        // Redirect to the dynamic page with the account ID
                        window.location.href = `/send/request/${accountId}`;
                    } else {
                        alert("Account not found for the user");
                    }

                } else {
                    alert("Failed to create customer's account");
                }
            } catch (error) {
                toast.info(error.response.data.message, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };


    // const handleRegister = async (e) => {
    //     e.preventDefault();

    //     if (validateForm()) {
    //         const formData = new FormData();
    //         formData.append("email", email);
    //         formData.append("password", password);
    //         formData.append("phoneNumber", phoneNumber);
    //         formData.append("nationalIdCard", nationalIdCard);
    //         formData.append("name", name);

    //         try {
    //             const response = await axios.post(
    //                 "https://3.83.201.151:7000/api/customer/user-register",
    //                 formData,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );

    //             if (response.status === 200) {
    //                 const customerId = response.data.customer.customerId;
    //                 toast.success("Your account has been created successfully!", {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });

    //                 // Redirect to the dynamic page with the customer ID
    //                 window.location.href = `http://localhost:3000/send/request/${customerId}`;
    //             } else {
    //                 alert("Failed to create customer's account");
    //             }
    //         } catch (error) {
    //             toast.info(error.response.data.message, {
    //                 position: "top-left",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             });
    //         }
    //     }
    // };



    return (
        <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader title="Create account (CUSTOMER)" />
                    <CardContent>
                        <form onSubmit={handleRegister}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="body1">Name</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={name}
                                        onChange={(nm) => setName(nm.target.value)}
                                    // error={errors.name ? true : false}
                                    // helperText={errors.name}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Email Address</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={email}
                                        onChange={(mail) => setEmail(mail.target.value)}
                                    // error={errors.email ? true : false}
                                    // helperText={errors.email}
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
                                    // error={errors.phoneNumber ? true : false}
                                    // helperText={errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">National ID</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={nationalIdCard}
                                        onChange={(nid) => setNationalIdCard(nid.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Location</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={location}
                                        onChange={(location) => setLocation(location.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
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
                                <Typography align="center">
                                    Already have an account? <Link href="/customer/login">Login</Link>
                                </Typography>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{
                                            backgroundColor: '#00A86B',
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                            <ToastContainer
                                // theme="dark"
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default CustomerRegister;
