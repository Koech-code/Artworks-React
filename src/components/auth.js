
// Material UI imports
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Register";

const Auth = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="App">
            <Paper elevation={3} style={{ padding: "10px", paddingBottom: "50px" }}>
                <div align="center">
                    {checked ? (
                        <Chip
                            icon={<LockIcon />}
                            label="Log In"
                            variant="outlined"
                            color="primary"
                        />
                    ) : (
                        <Chip
                            icon={<FaceIcon />}
                            label="Sign Up"
                            variant="outlined"
                            color="info"
                        />
                    )}
                    <br />

                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                        color="success"
                    />
                </div>

                {checked ? <Login /> : <Signup />}
            </Paper>
        </div>
    );
}

export default Auth;