import React, { useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Box,
    TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@mui/icons-material/Save';
const Children = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div style={{ paddingLeft: "200px" }}>
            <div style={{ position: 'fixed', top: '80px', right: '10px' }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Onboard Child
                </Button>
            </div>
            <Dialog open={isOpen} onClose={handleClose} style={{ paddingLeft: "200px" }}>
                <DialogTitle>
                    <Box>
                        <Typography variant="h6">Only parents can create a child's account</Typography>

                    </Box>

                </DialogTitle>
                <DialogContent>
                    <Card>
                        <CardHeader title="Child Information" />
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Name of child"
                                name="name"
                                // value={name}
                                // onChange={(name) => setName(name.target.value)}
                                margin="normal"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Age"
                                name="name"
                                // value={name}
                                // onChange={(name) => setName(name.target.value)}
                                margin="normal"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                type="file"
                                variant='outlined'
                                sx={{ m: 4 }}
                                required
                            />
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Children;
