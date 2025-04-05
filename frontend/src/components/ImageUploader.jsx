import { useState, useCallback } from "react";
import axios from "../../axios/axios";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImage"; 

export default function ImageUploader() {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
        const imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        try {
        const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

        const form = new FormData();
        form.append('croppedImage', croppedImageBlob, 'cropped.jpeg');

        axios.post("/profile/upload-profilepicture", form)
        .then()
        .catch()

        const result = await response.json();
        console.log(result);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imageSrc && (
            <div style={{ position: 'relative', width: 300, height: 300 }}>
            <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
            </div>
        )}

        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};
