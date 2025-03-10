import { useState } from "react";
import useDetails from "../../hooks/useDetails";
import axios from "../../axios/axios";
import { Avatar, Badge, Box, Button, CircularProgress, Container, Divider, IconButton, Input, Modal, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";

export default function UserProfile() {
    const {details, setDetails} = useDetails();
    const [modal, setModal] = useState({
        open: false,
        field: "",
        value: "",
        label: "",
    });
    const [openImageModal, setOpenImageModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [profilePicture, setProfilePicture] = useState();
    const [imageLoading, setImageLoading] = useState(false);

    const handleProfileEdit = async () => {
        const fieldData = { [modal.field]: modal.value };

        await axios.patch('/profile/edit', fieldData)
        .then(res => toast.success(res.data.message))
        .catch(e => toast.error(e.data));

        setDetails({
            ...details,
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
            value: details[field] || "",
            ...fieldConfig[field]
        });
    };

    const handleOpenImageModal = () => {
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setImagePreview(null);
        setOpenImageModal(false);
    };

    const handleImagePreview = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        };
    };

    const handleImageUpload = () => {   
        const formData = new FormData();
        formData.append("image", profilePicture);
        setImageLoading(true);
        axios.post("/profile/upload-profilepicture", formData)
        .then((res) => {
            setImageLoading(false);
            toast.success(res.data.message);
            handleCloseImageModal();
        })
        .catch((e) => {
            setImageLoading(false);
            toast.error(e.response.data.error);
        });
    };

    const handleCloseModal = () => {
        setModal({ ...modal, open: false });
    };

    const handleModalChange = (e) => {
        setModal({...modal, value: e.target.value});
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh",  pt: "75px", pb: "15px", display: "flex", flexDirection: "column", alignItems: { sm: "center", lg: "none" } }}>
            {details ? 
            <>
                <Box sx={{ width: { sm: "90%", lg: "70%" }, height: 100, px: 1, position: "relative", display: "flex", alignItems: "center", gap: 3, }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <IconButton sx={{ backgroundColor: "black", color: "white", borderRadius: "50%", padding: "5px", width: 32, height: 32 }} onClick={handleOpenImageModal}>
                                <AddAPhotoIcon sx={{ width: 20, height: 20 }} />
                            </IconButton>
                        }
                        >
                        <Avatar
                            sx={{ width: 80, height: 80 }}
                            src={details?.optprofilepicture+`?t=${new Date().getTime()}`}
                        />
                    </Badge>
                    <Box>
                        <Typography variant="h5">{details.name}</Typography>
                        <Typography variant="body2">{details.regno}</Typography>
                    </Box>
                </Box>
                <Modal open={openImageModal} onClose={handleCloseImageModal}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "fit", bgcolor: 'background.paper', boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: "text.primary" }}>Upload Profile Picture</Typography>
                        <Avatar sx={{ width: 100, height: 100, mx: "auto" }} src={imagePreview}/>
                        <Input type="file" accept="image/png, image/jpeg" onChange={handleImagePreview}/>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="text" onClick={handleCloseImageModal}>Cancel</Button>
                            <Button variant="contained" onClick={handleImageUpload} disabled={!imagePreview || imageLoading}>Upload</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={modal.open} onClose={handleCloseModal}>
                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "fit", bgcolor: "background.paper", boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ color: "text.primary" }}>Edit your {modal.label}</Typography>
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
                            <Typography sx={{ color: "grey.700" }}>{details?.name}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("name")}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Gender</Typography>
                        <Typography sx={{ color: "grey.700" }}>{details?.gender}</Typography>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Email ID</Typography>
                        <Typography sx={{ color: "grey.700" }}>{details?.email}</Typography>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold" }}>Contact Number</Typography>
                            <Typography sx={{ color: "grey.700" }}>{details?.phoneno}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("phoneno")}>
                            <EditIcon/>
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2, width: "100%" }}/>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                            <Typography sx={{ fontWeight: "bold" }}>Instagram</Typography>
                            <Typography sx={{ color: "grey.700" }}>{details?.instagram}</Typography>
                        </Box>
                        <IconButton size="medium" onClick={() => handleOpenModal("instagram")}>
                            <EditIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </> : <CircularProgress sx={{ m: "auto" }} />}         
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    );
};