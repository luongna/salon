import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, viVN } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import Header from '../../components/Header';
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link } from 'react-router-dom';

const Team = () => {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        setTeamData(mockDataTeam);
    }, []);

    const handleDelete = (id) => {
        setTeamData((prevData) => prevData.filter((item) => item.id !== id));
    };

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
            field: 'age',
            headerName: 'Ngày sinh',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'access',
            headerName: 'Role',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box display="flex" justifyContent="center">
                        <Link to={`/editUser/${id}`}>
                            <IconButton aria-label="Edit" size="small">
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link>

                        <IconButton
                            aria-label="Delete"
                            size="small"
                            onClick={() => {
                                handleDelete(id);
                            }}
                        >
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Người dùng" subtitle="Quản lý người dùng" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
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
                }}
            >
                <DataGrid
                    rows={teamData}
                    columns={columns}
                    localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                />
            </Box>
        </Box>
    );
};

export default Team;
