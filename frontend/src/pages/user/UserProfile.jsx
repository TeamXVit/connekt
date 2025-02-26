import { useEffect, useRef, useState } from "react";
import axios from "../../axios/axios";
import { Avatar, Badge, Box, Button, Container, Divider, IconButton, Modal, TextField, Typography } from "@mui/material";
import Chopper from "../../assets/chopper.jpeg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";


export default function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [modal, setModal] = useState({
        open: false,
        field: "",
        value: "",
        label: "",
    });

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const fetchData = async () => {
            await axios.get('/profile/view')
            .then(res => {setUserDetails(res.data); console.log(res.data)})
            .catch(e => console.log(e));
        }

        fetchData();
    }, []);

    const handleProfileEdit = async () => {
        const fieldData = { [modal.field]: modal.value };

        await axios.patch('/profile/edit', fieldData)
        .then(res => toast.success(res.data.message))
        .catch(e => toast.error(e.data));

        setUserDetails({
            ...userDetails,
            [modal.field]: modal.value
        });

        handleCloseModal();
    };

    const handleOpenModal = (field) => {
        const fieldConfig = {
            name: { label: 'Name' },
            phoneno: { label: 'Contact Number' },
            instagram: { label: 'Instagram' }
        };
        
        setModal({
            open: true,
            field,
            value: userDetails[field] || '',
            ...fieldConfig[field]
        });
    };

    const handleCloseModal = () => {
        setModal({ ...modal, open: false });
    };

    const handleModalChange = (e) => {
        setModal({...modal, value: e.target.value});
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh",  pt: "70px", pb: "15px" }}>
            <Typography variant="h4" sx={{ my: 2 }}>Your Profile</Typography>
            {userDetails && 
            <>
                <Box sx={{ width: { sm: "100%", lg: "70%" }, height: 100, px: 1, position: "relative", display: "flex", alignItems: "center", gap: 3, }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <IconButton
                            sx={{
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "50%",
                                padding: "5px",
                                width: 32,
                                height: 32,
                            }}
                            >
                                <AddAPhotoIcon sx={{ width: 20, height: 20 }} />
                            </IconButton>
                        }
                        >
                        <Avatar
                            sx={{ width: 80, height: 80 }}
                            src={Chopper}
                        />
                    </Badge>
                    <Box>
                        <Typography variant="h5">{userDetails.name}</Typography>
                        <Typography variant="body2">{userDetails.regno}</Typography>
                    </Box>
                </Box>
                <Modal open={modal.open} onClose={handleCloseModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "fit", bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "text.primary" }}>Edit your {modal.label}</Typography>
                        <TextField label={modal.label} variant="outlined" value={modal.value} onChange={handleModalChange}/>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={handleCloseModal}>Cancel</Button>
                            <Button variant="contained" onClick={handleProfileEdit}>Edit</Button>
                        </Box>
                    </Box>
                </Modal>
                <Box sx={{ width: { sm: "90%", lg: "70%" }, mt: 1, p: 2 }}>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
                            <Typography sx={{ color: "grey.700" }}>{userDetails.name}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("name")}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Gender</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.gender}</Typography>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Email ID</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.email}</Typography>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold" }}>Contact Number</Typography>
                            <Typography sx={{ color: "grey.700" }}>{userDetails.phoneno}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("phoneno")}>
                            <EditIcon/>
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold" }}>Instagram</Typography>
                            <Typography sx={{ color: "grey.700" }}>{userDetails.instagram}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("instagram")}>
                            <EditIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </>
            }
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    );
};