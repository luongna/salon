import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import InputAdornment from '@mui/material/InputAdornment';
// import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
const currencies = [
    {
        value: 'none',
        label: 'Chọn chi nhánh',
    },
    {
        value: '1',
        label: 'ngũ hành sơn',
    },
    {
        value: '2',
        label: 'hòa hải',
    },
    {
        value: '3',
        label: 'hải châu',
    },
];

const Form = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
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
                                // type="text"
                                select
                                label="Chi nhánh"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.branch}
                                name="branch"
                                error={!!touched.branch && !!errors.branch}
                                helperText={touched.branch && errors.branch}
                                sx={{ gridColumn: 'span 4' }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                            <TextField
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
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="file"
                                label="Ảnh"
                                inputProps={{ accept: 'image/*' }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.file}
                                name="file"
                                error={!!touched.file && !!errors.file}
                                helperText={touched.file && errors.file}
                                sx={{ gridColumn: 'span 4' }}
                            />
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
    );
};
const legex = /^(?!none$).*$/;
const checkoutSchema = yup.object().shape({
    name: yup.string().required('Không hợp lệ'),
    price: yup.number().required('Không hợp lệ'),
    rankPoint: yup.number().required('Không hợp lệ'),
    branch: yup.string().matches(legex, 'Vui lòng chọn chi nhánh').required('Không hợp lệ'),
    file: yup.string().required('Không hợp lệ'),
});
const initialValues = {
    name: '',
    price: '',
    rankPoint: '',
    branch: 'none',
    file: '',
};

export default Form;
