import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { useRef } from 'react';

export default function CustomizedInputBase() {
    const searchRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchValue = searchRef.current.value;
        // TODO call api & map data
        console.log('search value', searchValue);
    };
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                margin: '40px auto 0',
                backgroundColor: 'rgb(246, 109, 109)',
            }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <InputBase
                inputRef={searchRef}
                sx={{ ml: 1, flex: 1 }}
                style={{ fontSize: '14px', color: '#fff' }}
                placeholder="Tìm kiếm"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={(e) => handleSubmit(e)}>
                <SearchIcon style={{ fontSize: '14px', color: '#fff' }} />
            </IconButton>
        </Paper>
    );
}
