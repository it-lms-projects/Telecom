import React from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';

const CustomTablePagination = (props) => {
    const theme = useTheme();
    const { 
        count, 
        page, 
        rowsPerPage, 
        onPageChange, 
        fromValue, 
        toValue,
        onFromValueChanged,
        onToValueChanged,
    } = props;

    return (
        <div className="flex flex-row items-center justify-center gap-1">
            <TextField
                value={Math.min(fromValue, count)}
                onChange={(e) => onFromValueChanged(e.target.value)}
                size="small"
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // default hidden
                        textAlign: 'center',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #1976d2', // show border on focus
                        textAlign: 'center',
                    },
                    width: 'auto',
                    display: 'inline-flex', // Important: prevent full width
                    '& .MuiInputBase-root': {
                        width: 'auto',
                    },
                    '& input': {
                        width: `${String(fromValue).length + 0}ch`, // Optional: fine-tune based on content
                    },
                }}                
            />
            <span>-</span>
            <TextField
                value={Math.min(toValue, count)}
                onChange={(e) => onToValueChanged(e.target.value)}
                size="small"
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none', // default hidden
                        textAlign: 'center',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #1976d2', // show border on focus
                        textAlign: 'center',
                    },
                    width: 'auto',
                    display: 'inline-flex', // Important: prevent full width
                    '& .MuiInputBase-root': {
                        width: 'auto',
                    },
                    '& input': {
                        width: `${String(toValue).length + 0}ch`, // Optional: fine-tune based on content
                    },
                }}                
            />
            <span>/</span>
            <span>{count > 5000 ? '5000+' : count}</span>
            <Box sx={{ flexShrink: 0, ml: 1.5 }}>            
                <IconButton
                    onClick={(e) => onPageChange(e, page - 1)}
                    disabled={page === 0}
                    aria-label="previous page">
                    {theme.direction === 'rtl'
                        ? <KeyboardArrowRight />
                        : <KeyboardArrowLeft />
                    }
                </IconButton>
                <IconButton
                    onClick={(e) => onPageChange(e, page + 1)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page">
                    {theme.direction === 'rtl'
                        ? <KeyboardArrowLeft />
                        : <KeyboardArrowRight />
                    }
                </IconButton>            
            </Box>
        </div>
    );
}

export default CustomTablePagination;