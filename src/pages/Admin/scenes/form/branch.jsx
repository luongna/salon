import { Box, Button, TextField } from '@mui/material';
import axios from '~/utils/api/axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvent, Marker, Popup } from 'react-leaflet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = defaultIcon;
const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const [selectedPoint, setSelectedPoint] = useState(null);
    const handleMapClick = (e) => {
        setSelectedPoint(e.latlng);
    };
    const MapClickHandler = () => {
        useMapEvent('click', handleMapClick);
        return null;
    };
    const handleFormSubmit = (values, { resetForm }) => {
        if (selectedPoint != null) {
            const formValues = {
                ...values,
                name: values.name,
                address: values.address,
                lat: selectedPoint.lat,
                lng: selectedPoint.lng,
                status : 1
            };
            axios
                .post(`/branch`, formValues)
                .then((res) => {
                    resetForm();
                    setSelectedPoint(null);
                    toast.success('Tạo chi nhánh thành công!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                })
                .catch((error) => console.log(error));
        
        } else {
            alert('Chưa chọn chi nhánh trên bản đồ');
        }
    };

    return (
        <>
            <Box m="20px">
                <Header title="Tạo chi nhánh" />

                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tên chi nhánh"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: 'span 4' }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Địa chỉ"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    name="address"
                                    error={!!touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                            </Box>
                            <div style={{ marginTop: '1rem', width: '100%' }}>
                                <MapContainer
                                    center={[15.979122033083634, 108.25241088867189]}
                                    style={{ height: 500 }}
                                    zoom={14}
                                >
                                    <TileLayer
                                        attribution="Salon"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    ></TileLayer>
                                    {selectedPoint && (
                                        <Marker position={selectedPoint}>
                                            <Popup>Chi nhánh của bạn ở đây!</Popup>
                                        </Marker>
                                    )}
                                    <MapClickHandler />
                                </MapContainer>
                            </div>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Tạo chi nhánh
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            <ToastContainer />
        </>
    );
};

const checkoutSchema = yup.object().shape({
    name: yup.string().required('required'),
    address: yup.string().required('required'),
});

const initialValues = { name: '', address: '' };
export default Form;
