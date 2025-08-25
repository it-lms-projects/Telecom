import React from "react";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

function Filter({ column, table }) {
    const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === 'number'
        ? (
            <div className="flex space-x-2">
                <InputBase
                    type="number"
                    value={(columnFilterValue)?.[0] ?? ''}
                    onChange={e =>
                        column.setFilterValue(old => [
                            e.target.value,
                            old?.[1],
                        ])
                    }
                    placeholder={`Min`}
                    className="w-24 border shadow rounded"
                />
                <InputBase
                    type="number"
                    value={(columnFilterValue)?.[1] ?? ''}
                    onChange={e =>
                        column.setFilterValue(old => [
                            old?.[0],
                            e.target.value,
                        ])
                    }
                    placeholder={`Max`}
                    className="w-24 border shadow rounded"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        ) 
        : (
            <InputBase
                value={(columnFilterValue ?? '')}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder={`Search...`}
                className="w-36 border shadow rounded"
                inputProps={{ 'aria-label': 'search' }}
            />
        );
}

export default function FlatTable({ data, columns, onRowSelected, onRowChecked, onRowsChecked }) {
    const table = useReactTable({
        data: data || [],
        columns,        
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // Pipeline
        debugTable: false,
    });

    const { pageSize, pageIndex } = table.getState().pagination;

    const handleRowClick = (cell, row) => {        
        // Skip when the user click on the checkbox in the selector column
        if (cell.column.id === 'SelectorColumn') {
            if (row) {
                onRowChecked(row);
            }
            return;
        }
        if (row) {
            onRowSelected(row);
        }
    };

    const handleColumnHeaderClick = (args) => {
        if (args.id === "SelectorColumn") {
            if(onRowsChecked) {
                onRowsChecked(data);
            }
        }
    };

    return (
        <Box sx={{ width: '100%' }}>            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="bg-[#ffffff]">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableCell 
                                            key={header.id} 
                                            colSpan={header.colSpan} 
                                            onClick={() => handleColumnHeaderClick(header)}>
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <Filter column={header.column} table={table} />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <TableRow key={row.id} className="even:bg-[#eff8ff8c] odd:bg-white hover:cursor-pointer hover:bg-gray-100">
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id} onClick={() => handleRowClick(cell, row)} className="h-9">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                        {/* [THREE DUMMY ROWS] */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={`dummy-row-${index}`} className="even:bg-[#eff8ff8c] odd:bg-white hover:cursor-pointer hover:bg-gray-100">
                                {table.getVisibleFlatColumns().map(column => (
                                    <TableCell key={`dummy-cell-${index}-${column.id}`} className="h-9">
                                        <div></div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {/* [THREE DUMMY ROWS] */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}