import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, viVN } from '@mui/x-data-grid';
import { tokens } from '~/utils/theme/theme';
import axios from '~/utils/api/axios';
import { Link } from 'react-router-dom';

function AcceptBooking() {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        axios
            .get(`/booking`)
            .then((res) => {
                const user = res.data;
                setTeamData(user);
            })
            .catch((error) => console.log(error));
    }, []);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'name',
            headerName: 'Tên',
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Ngày',
            type: 'text',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            renderCell: ({ row }) => {
                const timestamp = row.date;
                const date = new Date(timestamp);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${day}/${month}/${year}`;
            },
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: ({ row }) => {
                return row.status === 0 ? 'Chưa hoàn thành' : 'Đã hoàn thành';
            },
        },
        {
            field: 'payment',
            headerName: 'Thanh toán',
            flex: 1,
            renderCell: ({ row }) => {
                return row.payment === 0 ? 'Chưa thanh toán' : 'Đã thanh toán';
            },
        },
        {
            field: 'totalPrice',
            headerName: 'Tổng tiền',
            flex: 1,
           
        },
        {
            field: 'actions',
            headerName: 'Thanh toán',
            flex: 1,
            renderCell: ({ row }) => {
                return row.payment === 0 ? (
                    <Box>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            sx={{ fontFamily: 'Lora, serif' }}
                        >
                            Thanh toán
                        </Button>
                    </Box>
                ) : null;
            },
        },
        {
            field: 'actions2',
            headerName: 'Hoàn thành',
            flex: 1,
            renderCell: ({ row }) => {
                return row.status === 0 ? (
                    <Box>
                        <Button
                            type="reset"
                            color="warning"
                            variant="contained"
                            sx={{ fontFamily: 'Lora, serif' }}
                        >
                            Hoàn thành
                        </Button>
                    </Box>
                ) : null;
            },
        },
    ];
    return (
        <>
            <div className="container">
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        '& .MuiDataGrid-root': {
                            border: 'none',
                            fontSize: '16px',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                            fontSize: '12px',
                        },
                        '& .name-column--cell': {
                            color: colors.greenAccent[300],
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: colors.primary[400],
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: 'none',
                            backgroundColor: colors.blueAccent[700],
                        },
                        '& .MuiCheckbox-root': {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        '& .MuiToolbar-root': {
                            fontSize: '16px',
                        },
                        '& p': {
                            fontSize: '16px',
                        },
                    }}
                >
                    <DataGrid
                        rows={teamData}
                        columns={columns}
                        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                        sx={{ wordWrap: 'break-word' }}
                    />
                </Box>
            </div>
        </>
    );
}

export default AcceptBooking;
