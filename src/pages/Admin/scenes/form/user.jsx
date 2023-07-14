import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

// import { useState, useEffect } from 'react';

const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="Tạo người dùng" />

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
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Số điện thoại"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                error={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: 'span 4' }}
                            />
                            <TextField
                                // fullWidth
                                variant="filled"
                                type="date"
                                label="Ngày sinh"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // value={values.date}
                                name="date"
                                error={!!touched.date && !!errors.date}
                                helperText={touched.date && errors.date}
                                sx={{ gridColumn: 'span 4', width: '200px'}}
                            />
                            
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    name: yup.string().required('Không được bỏ trống'),
    email: yup.string().email('Sai định dạng email').required('Không được bỏ trống'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Không được bỏ trống'),
    date: yup.date().max(new Date(),'Không được chọn quá ngày hôm nay').min('01/01/1923','ngày không hợp lệ').required('Không được bỏ trống'),
});
const initialValues = {
    name: '',
    date: '',
    email: '',
    phone: '',
};

export default Form;
