import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import {  useParams } from "react-router-dom";
import Header from '../../components/Header';
// import { useState, useEffect } from 'react';

const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    let  id  = useParams();
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    useEffect(() => {
       console.log(id)
      }, [id]);

    return (
        <Box m="20px">
            <Header title="Tạo người dùng"  />

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

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Lưu
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
    name: yup.string().required('required'),
    // lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required'),
    address: yup.string().required('required'),
});
const initialValues = {
    name: '',
    // lastName: '',
    email: '',
    phone: '',
    address: '',
};

export default Form;
