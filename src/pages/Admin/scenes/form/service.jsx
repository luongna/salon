import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';

const Form = () => {


    function isImageFile(file) {
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        // Check MIME type
        if (acceptedImageTypes.includes(file.type)) {
            return true;
        }

        // Check file extension
        const fileName = file.name;
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
        if (acceptedExtensions.includes(fileExtension)) {
            return true;
        }

        return false;
    }
    const isNonMobile = useMediaQuery('(min-width:600px)');


    const handleFormSubmit = (values, { resetForm }) => {
        if (imageBase64 !== '') {
            const formValues = {
                ...values,
                name: values.name,
                price: values.price,
                // rankPoint: values.rankPoint,
                branch: values.branch * 1,
                img: imageBase64,
            };
            axios
                .post(`http://localhost:8080/service`, formValues)
                .then((res) => {})
                .catch((error) => console.log(error));
                toast.success('Tạo dịch vụ thành công thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                resetForm();
                setImageBase64('');
        }else{
            toast.warning('Bạn chưa chọn ảnh!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    const [imageBase64, setImageBase64] = useState('');

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (isImageFile(file)) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setImageBase64(base64String);
            };

            reader.readAsDataURL(file);
        } else {
            setImageBase64('');
            toast.warning('Đây không phải là ảnh!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    }
    return (
        <>
            <Box m="20px">
                <Header title="Tạo dịch vụ" />

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
                                    label="Tên"
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
                                    label="Giá"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name="price"
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: 'span 4' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">VND</InputAdornment>,
                                    }}
                                />
                                {/* <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Điểm rank"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.rankPoint}
                                name="rankPoint"
                                error={!!touched.rankPoint && !!errors.rankPoint}
                                helperText={touched.rankPoint && errors.rankPoint}
                                sx={{ gridColumn: 'span 4' }}
                            /> */}
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Mô tả"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    name="description"
                                    error={!!touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} />
                                {imageBase64 && <img src={imageBase64} alt="Selected" />}
                            </Box>

                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Tạo dịch vụ
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
const legex = /^(?!none$).*$/;
const checkoutSchema = yup.object().shape({
    name: yup.string().required('Không hợp lệ'),
    price: yup.number().required('Không hợp lệ'),
    // rankPoint: yup.number().required('Không hợp lệ'),
    branch: yup.string().matches(legex, 'Vui lòng chọn chi nhánh').required('Không hợp lệ'),
    description: yup.string().required('Không hợp lệ'),
    // file: yup.string().required('Không hợp lệ'),
});
const initialValues = {
    name: '',
    price: '',
    // rankPoint: '',
    branch: 'none',
    description: '',
    // file: '',
};

export default Form;
