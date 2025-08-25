import React, { useMemo, useState } from "react";
import { Checkbox } from "@mui/material";
import { CheckedIcon, UncheckedIcon } from "@components/icons/svg";
import FlatTable from "@components/tables/flat_table";
import PageViewHeader from "@components/headers/page_view_header";

export default function EquipmentList({ }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const columns = useMemo(
        () => [
            {
                id: "SelectorColumn",
                width: 25,
                header: ({ table }) => (
                    <Checkbox
                        icon={<UncheckedIcon />}
                        checkedIcon={<CheckedIcon />}
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                        sx={{
                            color: "pink",
                            borderRadius: "0px",
                            '&.Mui-checked': {
                                color: "red",
                            },
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        icon={<UncheckedIcon />}
                        checkedIcon={<CheckedIcon />}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                ),
            },
            {
                header: () => <span className="text-[#383838]">N°</span>,
                enableColumnFilter: false,
                accessorKey: 'rowNumber',
                cell: info => {
                    return <div>{info.row.index + 1}</div>;
                },
            },
            {
                footer: props => props.column.id,
                accessorKey: 'jobNumber',
                enableColumnFilter: false,
                header: () => <span className="text-[#383838]">Numéro</span>,
            },
            {
                header: () => <span className="text-[#383838]">Lieu</span>,
                enableColumnFilter: false,
                footer: props => props.column.id,
                accessorKey: 'location',
                cell: info => info.getValue(),
            },
            {
                header: () => <span className="text-[#383838]">Relation</span>,
                enableColumnFilter: false,
                footer: props => props.column.id,
                accessorKey: 'relation',
            },
            {
                footer: props => props.column.id,
                accessorKey: 'fleetNumber',
                enableColumnFilter: false,
                header: () => <span className="text-[#383838]">N° Flotte</span>,
            },
            {
                header: () => <span className="text-[#383838]">Date In</span>,
                enableColumnFilter: false,
                footer: props => props.column.id,
                accessorKey: 'startDate',
                cell: info => info.getValue(),
            },
            {
                header: () => <span className="text-[#383838]">Date Out</span>,
                footer: props => props.column.id,
                accessorKey: 'endDate',
                enableColumnFilter: false,
            },
            {
                header: () => <span className="text-[#383838]">Durée</span>,
                footer: props => props.column.id,
                accessorKey: 'duration',
                enableColumnFilter: false,
            },
            {
                header: () => <span className="text-[#383838]">Destination</span>,
                footer: props => props.column.id,
                accessorKey: 'destination',
                enableColumnFilter: false,
            },
            {
                header: () => <span className="text-[#383838]">Chauffeur</span>,
                footer: props => props.column.id,
                accessorKey: 'driver',
                enableColumnFilter: false,
            },
            {
                header: () => <span className="text-[#383838]">Statut</span>,
                footer: props => props.column.id,
                accessorKey: 'status',
                enableColumnFilter: false,
                cell: info => {
                    return (
                        <span className={`text-sm py-1 px-4 rounded-3xl text-white font-thin ${info.row.original.status.state === 'cancelled' ? "bg-red-600" : info.row.original.status.state === 'completed' ? 'bg-green-600' : 'bg-amber-600'}`}>
                            {info.row.original.status.state === 'cancelled'
                                ? 'Annulé'
                                : info.row.original.status.state === 'completed'
                                    ? 'Terminé'
                                    : 'En cours'
                            }
                        </span>
                    );
                },
            },
        ],
        []
    );
    
    const handleFavItemClick = (item) => {
        
    };

    const handleSearchOptionsChange = () => {

    };

    const handlePrintItemClick = (item) => {
        
    };

    const handleActionItemClick = (item) => {

    };

    const handleFilterItemClick = (item) => {

    };

    const handleGroupItemClick = (item) => {
        
    };

    const handleRowSelected = (row) => {
        
    };

    const handleRowChecked = (newRow) => {
        
    };

    const handleRowsChecked = (rows) => {
        
    };

    return (
        <div className="">
            {/* Page Header */}
            <PageViewHeader
                title="Dotation Matérielle"
                actionTitle="Nouvelle dotation"
                onSearch={handleSearchOptionsChange}
                selectionCount={selectedRows.length}
                onPageChange={() => { }}
                maxRowsCount={0}
                onPageSizeChange={() => { }}
                onPrintItemClick={handlePrintItemClick}
                onActionItemClick={handleActionItemClick}
                onFilterItemClick={handleFilterItemClick}
                onGroupItemClick={handleGroupItemClick}
                onFavItemClick={handleFavItemClick}
                options={[
                    { labelText: 'Numéro', key: 'job_number' },
                    { labelText: 'Lieu', key: 'job_location' },
                    { labelText: 'Chauffeur', key: 'job_driver' },
                    { labelText: 'Intervenant', key: 'job_agent' },
                ]} />
            {/* Page Header */}

            {/* Page Content */}
            <FlatTable
                data={[]}
                columns={columns}
                onRowSelected={handleRowSelected}
                onRowChecked={handleRowChecked}
                onRowsChecked={handleRowsChecked} />
            {/* Page Content */}
        </div>
    );
};