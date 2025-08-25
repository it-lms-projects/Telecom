import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Autocomplete, Box, Button, IconButton, TextField } from "@mui/material";
import { ArrowDropDownIcon, DatePicker } from "@mui/x-date-pickers";
import { styled, lighten, darken } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircleOutline, CancelOutlined, DeleteForever, DeleteForeverRounded, PrintRounded, SaveOutlined, Star, TollTwoTone } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../components/hooks/use_auth";
import dayjs from "dayjs";
import { CloudIcon, UndoIcon } from "../../components/icons/svg";
import ChatterTimeline, { CenteredDateWithLine } from "../../components/timelines/chatter_timeline";

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    ...theme.applyStyles('dark', {
        backgroundColor: darken(theme.palette.primary.main, 0.8),
    }),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

const timelineData = [
    {
        title: 'Debruss Ilunga, initialisation',
        date: '17ᵗʰ September',
        description: 'Création de la tache JOB2024.04.0006'
    },
    {
        title: 'Debruss Ilunga, modification',
        date: '18ᵗʰ September',
        description: 'Ajout de la tache #TSK0001 sur JOB2024.04.0006',
    },
    {
        title: 'Vintianne Mahoneo, annulation',
        date: '19ᵗʰ September',
        description: 'Annulation de la tache JOB2024.04.0006',
    },
];

export default function AddTask({ }) {
    const [workJob, setWorkJob] = useState({
        id          : 0,
        title       : '',
        startDate   : null,
        endDate     : null,
        relation    : '',
        truckId     : 0,
        driverId    : 0,
        location    : '',
        destination : '',
        indexKm     : 0,
        status      : { state: 'pending', message: 'En cours' },
        tasks       : [],
    });
    const [changesPending, setChangesPending]       = useState(false);
    const [editMode, setEditMode]                   = useState(false);
    const [startDate, setStartDate]                 = useState(null); // State to control the start date
    const [endDate, setEndDate]                     = useState(null); // State to control the end date
    const [open1, setOpen1]                         = useState(false); // State to control the popup of start-date DatePicker
    const [open2, setOpen2]                         = useState(false); // State to control the popup of end-date DatePicker
    const [drivers, setDrivers]                     = useState([]);
    const [trucks, setTrucks]                       = useState([]);
    const [selectedRelation, setSelectedRelation]   = useState(null);
    const [selectedDriver, setSelectedDriver]       = useState(null);
    const [selectedVehicle, setSelectedVehicle]     = useState(null);
    const relations = useMemo(
        () => [
            { id: 1, title: 'Import' },
            { id: 2, title: 'Export' },
        ],
        [],
    );
    const auth            = useAuth(); // To get the auth object
    const navigate        = useNavigate(); // To navigate between pages
    const [seachParams]   = useSearchParams();

    const columns = useMemo(
        () => [
            {
                field         : 'id',
                headerName    : "ID",
                width         : 30,
            },
            {
                field         : 'title',
                headerName    : 'Titre',
                width         : 130,
                editable      : true,
            },
            {
                field         : 'description',
                headerName    : 'Description',
                minWidth      : 150,
                flex          : 1,
                editable      : true,
            },
            {
                field         : 'startDate',
                headerName    : 'Début',
                type          : 'date',
                width         : 120,
                editable      : true,
                valueGetter   : (params) => params ? new Date(params) : null,
            },
            {
                field         : 'endDate',
                headerName    : 'Fin',
                type          : 'date',
                width         : 120,
                editable      : true,
                valueGetter   : (params) => params ? new Date(params) : null,
            },
            {
                headerName    : "Statut",
                footer        : props => props.column.id,
                field         : 'status',
                type          : "singleSelect",
                editable      : true,
                width         : 220,
                renderEditCell: (args) => {
                    const valueOptions = [
                        { id: 1, value: "pending", label: 'En cours' }, // Pending
                        { id: 2, value: "completed", label: 'Terminé' }, // Completed
                        { id: 3, value: "cancelled", label: 'Annulé' }, // Cancelled
                    ];

                    return (
                        <Autocomplete
                            disablePortal
                            options={valueOptions}
                            value={valueOptions.find((option) => option.value === args.row.status) || null}
                            onChange={(_, value) => {
                                setWorkJob(prevWorkJob => ({
                                    ...prevWorkJob,
                                    tasks: prevWorkJob.tasks.map((task) => {
                                        if (task.id === args.row.id) {
                                            return {
                                                ...task,
                                                status: value.value,
                                            };
                                        }
                                        return task;
                                    })
                                }));
                                setChangesPending(true);
                            }}
                            sx={{ width: args.colDef.width }}
                            getOptionLabel={(option) => `${option.label}`}
                            renderInput={(params) => <TextField {...params} />}
                            slotProps={{
                                popper: {
                                    sx: {
                                        zIndex: 1000,
                                    },
                                },
                            }}
                        />
                    );
                },
                renderCell: (args) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                            <div>
                                <span className={`text-sm py-1 px-4 rounded-3xl text-white font-thin ${args.row.status === 'pending' ? "bg-amber-600" : args.row.status === 'completed' ? 'bg-green-600' : 'bg-red-600'}`}>
                                    {args.row.status === 'pending'
                                        ? 'En cours'
                                        : args.row.status === 'completed'
                                            ? 'Terminé'
                                            : 'Annulé'
                                    }
                                </span>
                            </div>
                            <ArrowDropDownIcon
                                onClick={(event) => {
                                    event.stopPropagation(); // to not select row
                                    /*ref.current.startCellEditMode({
                                        id: params.id,
                                        field: params.field
                                    });*/
                                }}
                                sx={{ color: "grey" }} />
                        </Box>
                    );
                },
            },
            {
                headerName    : "Agent",
                footer        : props => props.column.id,
                field         : 'agent',
                editable      : true,
                width         : 130,
                renderCell: (args) => {
                    return (
                        <span className={`text-sm py-1 px-4 text-gray-600 font-normal`}>
                            {args.row.agent}
                        </span>
                    );
                },
            },
            {
                headerName    : "Commentaire",
                footer        : props => props.column.id,
                field         : 'message',
                editable      : true,
                width         : 130,
                renderCell: (args) => {
                    return (
                        <span className={`text-sm py-1 px-4 text-gray-600 font-normal`}>
                            {args.row.message}
                        </span>
                    );
                },
            },
            {
                field         : 'actions', // Even though this doesn't map to real data, it's needed
                headerName    : 'Actions',
                size          : 70,
                renderCell: (args) => {
                    return (
                        <div className="text-red-600 flex flex-row items-center justify-center">
                            <IconButton className="flex flex-row gap-2 items-center" onClick={() => handleDelteTaskClick(args.row)}>
                                <DeleteForever fontSize="medium" className="text-red-700" />
                            </IconButton>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const paginationModel = { page: 0, pageSize: 5 };

    const validateRow = (newRow) => {
        const errors = {};
        //console.log(newRow);
        return errors;
    };

    const handleProcessRowUpdateError = (error) => {
        console.log(error);
        const errorDetails = JSON.parse(error.message);
        console.error("Row validation errors:", errorDetails);
        toast.error(
            `Validation Errors: ${Object.values(errorDetails).join(", ")}`
        );
    };

    const handleProcessRowUpdate = (newTask) => {
        const errors = validateRow(newTask);
        if (Object.keys(errors).length > 0) {
            throw new Error(JSON.stringify(errors));
        }
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            tasks: prevWorkJob.tasks.map((task) => {
                if (task.id !== newTask.id)
                    return task;
                else {
                    return {
                        id          : newTask.id,
                        dbId        : newTask.dbId,
                        canDelete   : newTask.canDelete,
                        description : newTask.description,
                        endDate     : newTask.endDate,
                        startDate   : newTask.startDate,
                        title       : newTask.title,
                        status      : newTask.status,
                        agent       : newTask.agent,
                        message     : newTask.message,
                    };
                }
            })
        }));
        setChangesPending(true);
        return newTask;
    };

    // Handler to add a new row
    const addRow = () => {
        const newTask = {
            dbId: 0, // The id of the row inside the database
            id: workJob.tasks.length + 1,
            title: `Titre tâche ${(workJob.tasks.length + 1)}`,
            description: `Description tâche ${(workJob.tasks.length + 1)}`,
            startDate: new Date(),
            endDate: null,
            canDelete: false, // Set to true, if an existing task has been deleted from the table
            status: 'pending',
            agent: '',
            message: '',
        };
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            tasks: [...prevWorkJob.tasks, newTask],
        }));
        setChangesPending(true);
    };

    const handleDelteTaskClick = (task) => {
        // Delete the task with the given id from the workJob state
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            tasks: prevWorkJob.tasks.filter(t => {
                if (t.id === task.id) {
                    t.canDelete = true; // Mark the task as deleted, will be checked on the server
                } else {
                    t.canDelete = false; // Mark the task as not deleted
                }
                return true; // Keep the other tasks
            }),
        }));
        setChangesPending(true);
    };

    // Handler to change the start date
    const handleStartDateChange = (newDate) => {
        if (!newDate) {
            toast.error("Invalid date format! Please select a valid date.");
            return;
        }
        setStartDate(newDate);
        // Update the start date in the workJob state
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            startDate: newDate.toDate(),
        }));
        setOpen1(false); // Close the date picker when done
        setChangesPending(true);
    };

    const handleEndDateChange = (newDate) => {
        if (!newDate) {
            toast.error("Invalid date format! Please select a valid date.");
            return;
        }
        setEndDate(newDate);
        // Update the end date in the workJob state
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            endDate: newDate.toDate(),
        }));
        setOpen2(false); // Close the date picker when done
        setChangesPending(true);
    };

    const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            location: newLocation,
        }));
        setChangesPending(true);
    };

    const handleIndexKmChange = (event) => {
        const newIndexKm = event.target.value;
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            indexKm: newIndexKm,
        }));
        setChangesPending(true);
    };

    const handleShipToChange = (event) => {
        const newShipTo = event.target.value;
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            destination: newShipTo,
        }));
        setChangesPending(true);
    };

    const handleRelationChange = (_, newValue) => {
        const newRelation = newValue || '';
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            relation: newRelation,
        }));
        setChangesPending(true);
    };

    const handleTruckChange = (_, newValue) => {
        const newTruckId = newValue ? newValue.id : 0;
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            truckId: newTruckId,
        }));
        setChangesPending(true);
    };

    const handleDriverChange = (_, newValue) => {
        const newDriverId = newValue ? newValue.id : 0;
        setWorkJob(prevWorkJob => ({
            ...prevWorkJob,
            driverId: newDriverId,
        }));
        setChangesPending(true);
    };

    const handleRevertChangesClick = () => {
        // Navigate back to the previous page
        navigate(-1);
    };

    const handleSaveJobClick = () => {
        // Save the current work job to the server
        fetch(editMode ? '/api/jobs/update' : '/api/jobs/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.accessToken}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify(workJob),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    // Show a toast that notify that update or creation has succeeded
                    toast.success("Row updated successfully!");
                    // Wait 2 seconds before redirect going back to the previous page
                    setTimeout(() => {
                        navigate(-1);
                    }, 3000);
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCloseClick = () => {
        // Change the status of the workjob from pending to completed
        // Save the current work job to the server
        fetch('/api/jobs/complete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.accessToken}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify({ jobId: workJob.id }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    // Show a toast that notify that update or creation has succeeded
                    toast.success(`${data.message}`);
                    // Wait 2 seconds before redirect going back to the previous page
                    setWorkJob(prevWorkJob => ({
                        ...prevWorkJob,
                        status: {
                            ...prevWorkJob.status,
                            state: 'completed',
                        },
                    }));
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Set the workjob status to pending
    // This is used when the workjob is cancelled and we want to set it back to pending
    const handleResetClick = () => {
        // Change the status of the workjob from pending to completed
        // Save the current work job to the server
        fetch('/api/jobs/reset', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.accessToken}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify({ jobId: workJob.id }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    // Show a toast that notify that update or creation has succeeded
                    toast.success(`${data.message}`);
                    // Wait 2 seconds before redirect going back to the previous page
                    setWorkJob(prevWorkJob => ({
                        ...prevWorkJob,
                        status: {
                            ...prevWorkJob.status,
                            state: 'pending',
                        },
                    }));
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Set the workjob status to cancelled
    const handleCancelJobClick = () => {
        // Change the status of the workjob from pending to completed
        // Save the current work job to the server
        fetch('/api/jobs/cancel', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.accessToken}`,
                'Accept': 'application/json',
            },
            body: JSON.stringify({ jobId: workJob.id }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('A network error occured: ' + response.statusText);
                }
                return response.json();  // Parse the JSON from the response
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    // Show a toast that notify that update or creation has succeeded
                    toast.success(`${data.message}`);
                    // Wait 2 seconds before redirect going back to the previous page
                    setWorkJob(prevWorkJob => ({
                        ...prevWorkJob,
                        status: {
                            ...prevWorkJob.status,
                            state: 'cancelled',
                        },
                    }));
                }
                else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handlePrintClick = () => {
        // Print the PDF report
        window.location.href = `/report?jobId=${workJob.id}`;
    };

    useEffect(() => {
        // 1. Generate WorkJob number
        const generateWorkJobNumber = () => {
            fetch('/api/jobs/sequence', {
                method: 'POST',
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
                    // Check if the response contains a success status
                    if (data.success) {
                        // Set the generated sequence number in the workJob state
                        setWorkJob(prevWorkJob => ({
                            ...prevWorkJob,
                            title: data.sequence,
                        }));
                    }
                    else {
                        console.log(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        // 2. Download trucks
        const getTrucks = () => {
            fetch('/api/trucks/all', {
                method: 'POST',
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
                        setTrucks(data.result);
                    }
                    else {
                        console.log(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        // 3. Download drivers
        const getDrivers = () => {
            fetch('/api/drivers/all', {
                method: 'POST',
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
                        setDrivers(data.result);
                    }
                    else {
                        console.log(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        // 2. Download trucks
        const getJobAndTasks = (jobId) => {
            fetch('/api/jobs/details', {
                method: 'POST',
                body: JSON.stringify({
                    jobId: jobId,
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
                        setWorkJob((prevWorkJob) => ({
                            ...data.result,
                            startDate: data.result.startDate ? new Date(data.result.startDate) : null,
                            endDate: data.result.endDate ? new Date(data.result.endDate) : null,
                        }));
                        setStartDate(data.result.startDate ? dayjs(data.result.startDate) : null);
                        setEndDate(data.result.endDate ? dayjs(data.result.endDate) : null);
                    }
                    else {
                        console.log(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };

        const mode = seachParams.get('mode');
        if (mode === 'update') {
            setEditMode(true);
            const _jobId = window.parseInt(seachParams.get('data'));
            getJobAndTasks(_jobId);
            // Get the job and its related tasks
        } else {
            // We generate a new work job number only if it's create mode
            generateWorkJobNumber();
        }

        getTrucks(); // Downlad trucks
        getDrivers(); // Download drivers
    }, []);


    useEffect(() => {
        if (Array.isArray(trucks)) {
            const _truck = trucks.find(t => t.id === workJob.truckId);
            if (_truck) {
                setSelectedVehicle(_truck);
            }
        }
    }, [trucks, workJob]);

    useEffect(() => {
        if (Array.isArray(relations)) {
            const _relation = relations.find(r => r.id === workJob.relation.id);
            if (_relation) {
                setSelectedRelation(_relation);
            }
        }
    }, [relations, workJob]);


    useEffect(() => {
        if (Array.isArray(drivers)) {
            const _driver = drivers.find(d => d.id === workJob.driverId);
            if (_driver) {
                setSelectedDriver(_driver);
            }
        }
    }, [drivers, workJob]);

    // Debug: Log the workJob state whenever it changes
    useEffect(() => {
        console.log(workJob);
    }, [workJob]);

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="bg-white shadow-md min-h-16 px-2 py-2">
                    <h3 className="text-xl flex flex-row items-center font-semibold text-neutral-600">
                        <span className="text-blue-700 font-medium">Maintenance</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span className="text-blue-700 font-medium">Jobs</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span className="text-blue-700 font-bold">{!editMode ? "Nouveau" : workJob.title}</span>
                        {editMode && (workJob.status?.state === 'cancelled' || workJob.status?.state === 'completed')
                            ? (
                                <span className={`text-base ml-2 gap-2 py-1 px-4 rounded-3xl text-white font-semibold ${workJob.status?.state === 'cancelled' ? "bg-red-600" : 'bg-green-600'}`}>
                                    {workJob.status?.state === 'cancelled'
                                        ? <span><DeleteForeverRounded fontSize="12px" /></span>
                                        : <span><Star fontSize="10px" /></span>
                                    }
                                    <span>{workJob.status?.state === 'cancelled' ? 'Annulé' : 'Terminé'}</span>
                                </span>
                            )
                            : changesPending
                                ? (
                                    <div className="flex flex-row items-center justify-center ml-2 gap-3 px-4 text-white font-semibold ">
                                        <IconButton disabled={!changesPending} onClick={handleSaveJobClick} className="text-white hover:cursor-pointer hover:text-blue-600 hover:bg-slate-500" size="small" title="Save changes">
                                            <CloudIcon />
                                        </IconButton>
                                        <IconButton disabled={!changesPending} onClick={handleRevertChangesClick} className="text-white hover:cursor-pointer hover:text-blue-600 hover:bg-slate-500" size="small" title="Ignorer les changements">
                                            <UndoIcon />
                                        </IconButton>
                                    </div>
                                )
                                : <></>
                        }
                    </h3>
                    <div className="flex flex-row gap-2 my-2">
                        {workJob.status?.state === 'pending'
                            ? (
                                <>
                                    <button style={{ display: "none" }} className={`hiddendisabled:bg-gray-400 disabled:hover:bg-gray-400 px-2 min-w-36 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-blue-700 hover:bg-blue-900`}>
                                        <SaveOutlined fontSize="medium" />
                                        <span>Enregistrer</span>
                                    </button>
                                    <button onClick={handleCancelJobClick} className={`disabled:bg-gray-400 disabled:hover:bg-gray-400 px-2 min-w-36 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-red-700 hover:bg-red-900`}>
                                        <CancelOutlined fontSize="medium" />
                                        <span>Annuler</span>
                                    </button>
                                </>
                            ) : (
                                <button className={`disabled:bg-gray-400 disabled:hover:bg-gray-400 px-2 min-w-36 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-blue-700 hover:bg-blue-900`}
                                    onClick={handleResetClick}>
                                    <TollTwoTone fontSize="medium" />
                                    <span>Remettre en cours</span>
                                </button>
                            )
                        }
                        {editMode
                            ? (
                                <>
                                    {workJob.status?.state === 'pending'
                                        ? (
                                            <button className="px-2 min-w-36 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-blue-700 hover:bg-blue-900" onClick={handleCloseClick}>
                                                <CancelOutlined fontSize="medium" />
                                                <span>Cl&ocirc;turer</span>
                                            </button>
                                        ) : <></>
                                    }
                                    <button className="px-2 min-w-36 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-blue-700 hover:bg-blue-900" onClick={handlePrintClick}>
                                        <PrintRounded fontSize="medium" />
                                        <span>Imprimer</span>
                                    </button>
                                </>
                            )
                            : <></>
                        }
                    </div>
                </div>
                <div className="flex flex-row flex-1 h-0 overflow-y-auto max-w-full">
                    <div className="w-3/5">
                        <div className="border-gray-300 mx-2 mt-2 mb-10 w-full shadow-md border-[1px] border-solid">
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                adapterLocale="fr">
                                <div className="grid grid-cols-2 gap-x-16 gap-y-8 p-12">
                                    <div className="col-span-2">
                                        <TextField
                                            id="task-sequence-number"
                                            label="Numéro"
                                            value={workJob.title}
                                            variant="filled"
                                            className="w-full font-bold text-2xl"
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }} />
                                    </div>

                                    {/* Start Date */}
                                    <DatePicker
                                        label="Date début"
                                        format="DD/MM/YYYY"
                                        id="task-start-date"
                                        readOnly={workJob.status?.state !== 'pending'}
                                        onChange={handleStartDateChange} // Handle date change
                                        value={startDate} // Set the selected date
                                        open={open1} // Control the popup state
                                        onOpen={() => setOpen1(true)} // Prevent default behavior when clicking the calendar icon
                                        onClose={() => setOpen1(false)} // Close the date picker when done
                                        textField={(params) => (
                                            <input
                                                {...params}
                                                onFocus={() => setOpen1(true)} // Open the date picker on input focus
                                            />
                                        )}
                                        slotProps={{
                                            textField: {
                                                onClick: () => setOpen1(true),
                                                id: 'task-start-date',
                                            },
                                        }}
                                        slots={{
                                            openPickerIcon: () => null, // Hide the calendar icon (optional)
                                        }} />
                                    {/* Start Date */}

                                    {/* End Date */}
                                    <DatePicker
                                        label="Date fin"
                                        format="DD/MM/YYYY"
                                        id="task-end-date"
                                        readOnly={workJob.status?.state !== 'pending'}
                                        onChange={handleEndDateChange} // Handle date change
                                        value={endDate} // Set the selected date
                                        open={open2} // Control the popup state
                                        onOpen={() => setOpen2(true)} // Prevent default behavior when clicking the calendar icon
                                        onClose={() => setOpen2(false)} // Close the date picker when done
                                        textField={(params) => (
                                            <input
                                                {...params}
                                                onFocus={() => setOpen2(true)} // Open the date picker on input focus
                                            />
                                        )}
                                        slotProps={{
                                            textField: {
                                                onClick: () => setOpen2(true),
                                                id: 'task-end-date',
                                            },
                                        }}
                                        slots={{
                                            openPickerIcon: () => null, // Hide the calendar icon (optional)
                                        }} />
                                    {/* End Date */}

                                    <TextField
                                        id="task-location"
                                        value={workJob.location}
                                        label="Lieu"
                                        variant="standard"
                                        onChange={handleLocationChange}
                                        slotProps={{
                                            input: {
                                                readOnly: workJob.status?.state !== 'pending',
                                            },
                                        }} />

                                    <TextField
                                        id="task-shipto"
                                        value={workJob.destination}
                                        label="Destination"
                                        variant="standard"
                                        onChange={handleShipToChange}
                                        slotProps={{
                                            input: {
                                                readOnly: workJob.status?.state !== 'pending',
                                            },
                                        }} />

                                    <Autocomplete
                                        disablePortal
                                        disabled={workJob.status?.state !== 'pending'}
                                        id="task-relation"
                                        options={relations}
                                        onChange={handleRelationChange}
                                        value={selectedRelation}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                paddingLeft: "0px!important",
                                            },
                                            "& .MuiInputLabel-root": {
                                                paddingLeft: "0px!important",
                                            },
                                        }}
                                        getOptionLabel={(option) => `${option.title}`}
                                        renderInput={(params) => <TextField {...params} label="Relation" />}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        disabled={workJob.status?.state !== 'pending'}
                                        id="task-truck"
                                        onChange={handleTruckChange}
                                        options={trucks.sort((a, b) => b.type.localeCompare(a.type))}
                                        groupBy={(truck) => truck.type}
                                        value={selectedVehicle}
                                        getOptionLabel={(truck) => truck.referenceInterne}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                paddingLeft: "0px!important",
                                            },
                                            "& .MuiInputLabel-root": {
                                                paddingLeft: "0px!important",
                                            },
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Truck / Link / Super-Link" />}
                                        renderGroup={(params) => (
                                            <li key={params.key}>
                                                <GroupHeader>{params.group}</GroupHeader>
                                                <GroupItems>{params.children}</GroupItems>
                                            </li>
                                        )}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        disabled={workJob.status?.state !== 'pending'}
                                        id="task-driver"
                                        value={selectedDriver}
                                        onChange={handleDriverChange}
                                        options={drivers}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                paddingLeft: "0px!important",
                                            },
                                            "& .MuiInputLabel-root": {
                                                paddingLeft: "0px!important",
                                            },
                                        }}
                                        getOptionLabel={(option) => `${option.prenom} ${option.nom} ${option.postnom}`}
                                        renderInput={(params) => <TextField {...params} label="Chauffeur" />}
                                    />
                                    <TextField
                                        id="task-kilometer-index"
                                        value={workJob.indexKm}
                                        label="Index Km"
                                        variant="standard"
                                        slotProps={{
                                            input: {
                                                readOnly: workJob.status?.state !== 'pending',
                                            },
                                        }}
                                        style={{ marginTop: "-6px" }}
                                        type="number"
                                        onChange={handleIndexKmChange} />
                                </div>
                            </LocalizationProvider>
                        </div>

                        <div className="border-gray-300 shadow-md mx-2 mt-2 mb-10 w-full border-[1px] border-solid">
                            <h3 className="p-4 text-gray-600 text-2xl">Tâches</h3>
                            <hr />
                            <div className="p-4">
                                <DataGrid
                                    editMode="row"
                                    rows={workJob.tasks.filter(task => !task.canDelete)} // Show only the task that has not been deleted
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    isCellEditable={(args) => workJob.status?.state === 'pending' && args.colDef.editable}
                                    sx={{ border: 0 }}
                                    scrollbarSize={50}
                                    processRowUpdate={handleProcessRowUpdate}
                                    onProcessRowUpdateError={handleProcessRowUpdateError} />

                                {workJob.status?.state === 'pending'
                                    ? (
                                        <Button variant="outlined" color="primary" onClick={addRow} className="flex flex-row items-center">
                                            <AddCircleOutline fontSize="small" className="mr-2" />
                                            <span>Nouvelle Tâche</span>
                                        </Button>
                                    ) : <></>
                                }
                            </div>
                        </div>

                        <div className="h-12">
                            <span className="clear-fix"></span>
                        </div>
                    </div>
                    <div className="w-2/5 ml-12 mr-6 mt-8">
                        {/* Centered Date with Line */}
                        <CenteredDateWithLine title="Historique" className="mb-4" />
                        <ChatterTimeline data={timelineData} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}