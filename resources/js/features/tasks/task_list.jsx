import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/fr'; // Import the desired locale
import updateLocale from "dayjs/plugin/updateLocale";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAuth } from "../../components/hooks/use_auth";
import FlatTable from "../../components/tables/flat_table";
import { CheckedIcon, UncheckedIcon } from "../../components/icons/svg";

import './../../../css/home.css';

import PageViewHeader from "../../components/headers/page_view_header";

function CustomActionBar() {
    return null; // Render nothing to hide the action bar
}

// Customized month names (capitalized)
const capitalizedMonths = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function HomePage({ }) {    
    const auth = useAuth();
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [jobs, setJobs] = useState([]);    
    const today = useMemo(() => dayjs(), []);
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

    const handleSearchOptionsChange = () => {

    };

    const handleRowSelected = (row) => {
        navigate(`/tasks/add?mode=update&data=${row.original.id}`);
    };

    const handleRowChecked = (newRow) => {
        setSelectedRows((prevRows) => {
            // Check if item already exists
            const exists = prevRows.some((row) => row.id === (newRow.original ? newRow.original.id : newRow.id));

            return exists
                ? prevRows.filter((row) => row.id !== (newRow.original ? newRow.original.id : newRow.id)) // Remove if present
                : [...prevRows, (newRow.original ? newRow.original : newRow)]; // Add if absent
        });
    };

    const handleRowsChecked = (rows) => {
        if(rows.length > selectedRows.length) {
            setSelectedRows(rows);
        } else {
            setSelectedRows([]);
        }
    };

    const handleFilterItemClick = (item) => {
        // console.log('Filter action triggered for:', item);
    };

    const handleGroupItemClick = (item) => {
        //console.log('Group action triggered for:', item);
    };

    const handleActionItemClick = (item) => {
        if(item.id === 'del') {
            // Handle delete action
            fetch('/api/jobs/delete', {
                method: 'POST',
                body: JSON.stringify({
                    jobId: selectedRows[0].id,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                if (data.status === 'success') {
                    const deletedJob = selectedRows[0];
                    setJobs(prevJobs => prevJobs.filter(job => deletedJob.id !== job.id)); // Remove the deleted job from the list
                    setSelectedRows([]); // Clear selected rows after deletion
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
        
        } else if (item.id === 'cpy') {
            // Handle copy action
            fetch('/api/jobs/copy', {
                method: 'POST',
                body: JSON.stringify({
                    jobId: selectedRows[0].id,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Accept': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) { 
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                if (data.status === 'success') {
                    const copiedJob = data.result; // Assuming the API returns the copied job
                    setJobs(prevJobs => [...prevJobs, copiedJob]); // Add the copied job to the list
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else if (item.id === 'mod') {
            // Handle modify action
            if (selectedRows.length > 0) {
                const workJob = selectedRows[0];
                navigate(`/tasks/add?mode=update&data=${workJob.id}`);
            }
        } 
        else if (item.id === 'exp') {
            // Handle export action
            console.log('Export action triggered for:', selectedRows);
        }
    };

    const handleFavItemClick = (item) => {
        // Handle favorite action
        //console.log('Favorite action triggered for:', item);        
    };

    const handlePrintItemClick = (item) => {
        // Check if the item is 'frm' or 'rcp' and handle accordingly
        if (item.id === 'frm') {
            // Print the PDF report
            if (selectedRows.length > 0) {
                const workJob = selectedRows[0];
                window.location.href = `/report?jobId=${workJob.id}`;
            }
        } else if (item.id === 'rcp') {
            // Handle print receipt action
            console.log('Print receipt action triggered for:', selectedRows);
        }
    };

    useEffect(() => {
        // Extend dayjs with locale update support
        dayjs.extend(updateLocale);
        // Capitalize month names
        dayjs.updateLocale("fr", { months: capitalizedMonths });        
    }, []);

    useEffect(() => {
        if (!auth?.accessToken) return; // Ensure we have an access token before making the request

        // Fetch jobs from the API
        fetch('/api/jobs/daily', {
                method: 'POST',
                body: JSON.stringify({
                    jobDate: new Date(),
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Accept': 'application/json',
                },
                credentials: 'include' // ← Required for session auth
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {                
                if (data.status === 'success') {
                    setJobs(data.result);
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [auth.accessToken]);
    
    useEffect(() => {
        // console.log("Selected rows changed:", selectedRows);
    }, [selectedRows]);

    return (
        <div className="h-full p-0 overflow-y-auto">

            {/* [PAGE HEADER] */}
            <PageViewHeader
                title="Liste des travaux"                
                onSearch={handleSearchOptionsChange}
                selectionCount={selectedRows.length}
                onPageChange={() => {}}
                maxRowsCount={jobs.length}
                onPageSizeChange={() => {}}
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
            {/* [PAGE HEADER] */}

            {/* [PAGE BODY] */}
            <div className="flex">
                <div className="flex-1">
                    <FlatTable 
                        data={jobs} 
                        columns={columns}                        
                        onRowSelected={handleRowSelected}
                        onRowChecked={handleRowChecked}
                        onRowsChecked={handleRowsChecked} />
                </div>
                <div className="hidden ml-4">
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="fr" // Specify the locale for the adapter
                        localeText={{ // Optional: Customize text for localization
                            today: "Aujourd'hui",
                            cancel: 'Annuler',
                            clear: 'Effacer',
                        }}>
                        <StaticDatePicker
                            orientation="portrait"
                            defaultValue={today}
                            openTo="day"
                            value={today} // Current date
                            textField={(params) => <input {...params} />}
                            locale='cd'
                            localeText={{ toolbarTitle: "Tâches du" }}
                            components={{
                                ActionBar: CustomActionBar, // Use the custom ActionBar component
                            }}
                            componentsProps={{
                                actionBar: { actions: [] }, // Ensure no actions are displayed
                            }} />
                    </LocalizationProvider>
                </div>
            </div>
            {/* [PAGE BODY] */}
        </div>
    );
}