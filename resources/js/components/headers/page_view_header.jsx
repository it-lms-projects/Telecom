import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import FavoritesDropdownMenu from "../dropdowns/favorite/favorites_dropdown_menu";
import GroupDropdownMenu from "../dropdowns/group/group_dropdown_menu";
import FilterDropdownMenu from "../dropdowns/filter/filter_dropdown_menu";
import ActionsDropdownMenu from "../dropdowns/action/actions_dropdown_menu";
import PrintDropdownMenu from "../dropdowns/print/print_dropdown_menu";
import CustomTablePagination from "./table_pagination";
import DropdownButton from "./../dropdowns/dropdown_button";
import DropdownHeader from "./dropdown_header";
import { PrintIcon, ActionsIcon, FilterIcon, GroupIcon, FavoritesIcon, ArrowRightIcon } from "./../icons/svg";
import { useClickOutside } from "../hooks/use_click_outside";

export default function PageViewHeader({
    title, // The title of the page
    actionTitle, // The title of main action button
    selectionCount, // The number of selected rows in the table
    maxRowsCount, // The total number of rows in the table
    options, // The options for the search box
    onSearch, // Triggered when the search box is used
    onPageChange, // Triggered when the page is changed
    onActionItemClick, // Triggered when an items of the actions dropdown is clicked
    onFavItemClick, // Triggered when an items of the favorites dropdown is clicked
    onPrintItemClick, // Triggered when an items of the print dropdown is clicked
    onGroupItemClick, // Triggered when an items of the group dropdown is clicked
    onFilterItemClick, // Triggered when an items of the filter dropdown is clicked
    onPageSizeChange, // Triggered when the page size is changed
}) {
    const [open, setOpen]                   = useState(false);  // State to control the popup of search box
    const [searchText, setSearchText]       = useState('');     // AutoComplete seach text    
    const [searchOptions, setSearchOptions] = useState([]);
    const [selectedRows, setSelectedRows]   = useState(0);
    const [rowsCount, setRowsCount]         = useState(0);      // Total number of rows in the table
    const [pageIndex, setPageIndex]         = useState(0);      // Current page index
    const [currentSearch, setCurrentSearch] = useState([]);     // { key: '', value: '' }
    const [groupItems, setGroupItems]       = useState([]);     // Group items for the dropdown menu
    const [filterItems, setFilterItems]     = useState([]);     // Filter items for the dropdown menu
    const [favoriteItems, setFavoriteItems] = useState([]);     // Favorite items for the dropdown menu
    const searchInputRef = useRef(null);
    const navigate       = useNavigate();

    const printHeader     = useMemo(() => <DropdownHeader icon={<PrintIcon />} title="Imprimer" />, []);
    const actionsHeader   = useMemo(() => <DropdownHeader icon={<ActionsIcon />} title="Actions" />, []);
    const filterHeader    = useMemo(() => <DropdownHeader icon={<FilterIcon />} title="Filtres" />, []);
    const groupHeader     = useMemo(() => <DropdownHeader icon={<GroupIcon />} title="Regrouper par" />, []);
    const favoritesHeader = useMemo(() => <DropdownHeader icon={<FavoritesIcon />} title="Favoris" />, []);

    // [MyTablePagination]
    const [page, setPage]               = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(80);                        // Default rows per page (like in Odoo)
    const [fromValue, setFromValue]     = useState(page * rowsPerPage + 1);
    const [toValue, setToValue]         = useState((page + 1) * rowsPerPage);
    // [MyTablePagination]

    useClickOutside(searchInputRef, () => setOpen(false), 'mousedown');

    const handleOnFromValueChanged = (from) => {
        if(from > 0 && from < toValue) {
            setFromValue(from);
            setRowsPerPage(toValue - from + 1);
        }
    };

    const handleOnToValueChanged = (to) => {
        if(to > fromValue && to > 0) {
            setToValue(to);
            setRowsPerPage(to - fromValue + 1);
        }
    };

    const handlePageChange = (_, pageIdx) => {
        setPage(pageIdx);
        setFromValue(pageIdx * rowsPerPage + 1);
        setToValue((pageIdx + 1) * rowsPerPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // [MyTablePagination]

    const handleFilterItemClick = (item, filterOptions) => {
        // Update the menu items to mark the applied group
        setFilterItems(prevItems => {
            const newItems = prevItems.map(it => {
                if (it.id === item.id) {
                    return { ...it, isApplied: true, options: filterOptions };
                }
                return it;
            });
            return newItems;
        });
        setCurrentSearch((prevSearch) => {
            if(prevSearch.some((searchItem) => searchItem.labelText === item.title)) {
                // If the filter is already applied, remove it from the current search
                return prevSearch.filter((searchItem) => searchItem.labelText !== item.title);
            } else {
                // If the filter is not applied, add it to the current search
                return [
                    ...prevSearch,
                    {
                        type: 'filter',
                        field: item.field,
                        labelText: item.title,
                        values: [item.title],
                    },
                ];
            }
        });
        if (onFilterItemClick) {
            onFilterItemClick(item);
        }
        // console.log('Selected filter item:', item);
    };
    
    const handleGroupItemClick = (item) => {
        // Update the menu items to mark the applied group
        setGroupItems(prevItems => {
            const newItems = prevItems.map(it => {
                if (it.id === item.id) {
                    return { 
                        ...it, 
                        isApplied: !it.isApplied, 
                        isDefault: true 
                    }; // We isDefault to true so that even if the option is unchecked, it will not be removed from the list
                }
                return it;
            });
            return newItems;
        });
        setCurrentSearch((prevSearch) => {
            if(prevSearch.some((searchItem) => searchItem.type === "group")) {
                // If the group is already applied, remove it from the current search
                const search = prevSearch.map((searchItem) => {
                    if(searchItem.type === "group") {
                        return {
                            ...searchItem,
                            values: searchItem.values.includes(item.title)
                                        ? searchItem.values.filter(v => v !== item.title)
                                        : [...searchItem.values, item.title],
                        };
                    }
                    return searchItem;
                });

                return search.filter((s) => !(s.type === "group" && s.values.length <= 0));
            } else {
                // If the group is not applied, add it to the current search
                return [
                    ...prevSearch,
                    {
                        type: 'group',
                        field: item.field,
                        labelText: item.title,
                        values: [item.title],
                    },
                ];
            }
        });
        if (onGroupItemClick) {
            onGroupItemClick(item);
        }
    };

    const handleFavItemClick = (item) => {
        if(onFavItemClick) {
            onFavItemClick(item);
        }
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value); // This will store the current search text
    };

    const handleCreateTask = () => {
        navigate('/tasks/add?mode=create');
    };

    useEffect(() => {
        setSearchOptions(options);
    }, [options]);

    useEffect(() => {
        setSelectedRows(selectionCount);
        setRowsCount(maxRowsCount);
    }, [selectionCount, maxRowsCount]);

    useEffect(() => {
        // console.log('Current search:', currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        setGroupItems([
            { id: 'grp_0001', title: 'Lieu', field: 'location', isApplied: false, isDefault: true },
            { id: 'grp_0002', title: 'Rélation', field: 'relation', isApplied: false, isDefault: true },
            { id: 'grp_0003', title: 'Flotte', field: 'fleet', isApplied: false, isDefault: false },
            { id: 'grp_0004', title: 'Destination', field: 'shipto', isApplied: false, isDefault: false },
            { id: 'grp_0005', title: 'Chauffeur', field: 'driver', isApplied: false, isDefault: false },
            { id: 'grp_0006', title: 'Statut', field: 'status', isApplied: false, isDefault: false },
        ]);

        setFilterItems([
            { id: 'flt_0001', groupKey: 'group_one', title: 'Filtre 1', type: "boolean", isApplied: false, isDefault: true },
            { id: 'flt_0002', groupKey: 'group_two', title: 'Filtre 2', type: "date", isApplied: false, isDefault: true },
            { id: 'flt_0003', groupKey: 'group_two', title: 'Filtre 3', type: "number", isApplied: false, isDefault: false },
            { id: 'flt_0005', groupKey: 'group_one', title: 'Filtre 5', type: "boolean", isApplied: false, isDefault: true },
            { id: 'flt_0006', groupKey: 'group_two', title: 'Filtre 6', type: "boolean", isApplied: false, isDefault: true },
            { id: 'flt_0007', groupKey: 'group_one', title: 'Filtre 7', type: "text", isApplied: false, isDefault: false },
            { 
                id: 'flt_0008', 
                groupKey: 'group_three', 
                title: 'Filtre 8', 
                type: "enum", 
                isApplied: false, 
                isDefault: false,
                values: [
                    { id: 'val_1', title: 'Valeur 1' },
                    { id: 'val_2', title: 'Valeur 2' },
                    { id: 'val_3', title: 'Valeur 3' },
                    { id: 'val_4', title: 'Valeur 4' },
                ],
            },
            { 
                id: 'flt_0004', 
                groupKey: 'group_three', 
                title: 'Filtre 4', 
                type: "enum",
                isApplied: false,
                isDefault: false,
                values: [
                    { id: 'val_1', title: 'Valeur 1' },
                    { id: 'val_2', title: 'Valeur 2' },
                    { id: 'val_3', title: 'Valeur 3' },
                    { id: 'val_4', title: 'Valeur 4' },
                ],
            },
        ]);

        setFavoriteItems([
            { id: 'fav_0001', title: 'Enregistrer la recherche actuelle' },
            { id: 'fav_0002', title: 'Lien vers le menu dans feuille de calcul' },
            { id: 'fav_0003', title: 'Ajouter à mon tableau de bord' },
        ]);
    }, []);

    return (
        <div className="my-1">
            <div className="flex flex-row justify-between">
                <div className="flex-1 flex flex-col items-start justify-between px-4">
                    {/* TITLE */}
                    <div className="pt-2">
                        <p className="text-gray-600 text-2xl">{title}</p>
                    </div>
                    {/* TITLE */}

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-row items-center pt-2">
                        <div className="flex flex-row items-center gap-1">
                            <button
                                className="px-2 min-w-48 h-[35px] text-white flex flex-row gap-2 items-center justify-start bg-blue-700 hover:bg-blue-900 mx-0 my-2 font-semibold border-xs shadow-sm p-2"
                                onClick={handleCreateTask}>                                
                                <span className="mx-1">{actionTitle}</span>
                            </button>
                            <div className={`${selectedRows > 0 ? "" : "invisible"} bg-blue-200 h-[35px] px-2 py-1 flex gap-1 flex-row items-center`}>
                                <span className="text-blue-700">{selectedRows} sélectionnés</span>
                                <button className="flex flex-row items-center gap-1 h-full bg-blue-700 text-white font-semibold text-sm">
                                    <ArrowRightIcon color="white" />
                                    <div className="flex flex-row gap-1 mx-2">
                                        <span>Tout sélectionner</span>
                                        <span>{rowsCount}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-row items-center justify-between">
                            <div className={`flex-1 flex flex-row items-center justify-center ${selectedRows > 0 ? "" : "invisible"}`}>
                                <DropdownButton header={printHeader} className="mx-2">
                                    <PrintDropdownMenu onItemClick={(item) => onPrintItemClick(item)} items={[
                                        { id: 'frm', title: 'Fiche' },
                                        { id: 'rcp', title: 'Récipicé' },
                                    ]} />
                                </DropdownButton>
                                <DropdownButton header={actionsHeader} className="mx-2">
                                    <ActionsDropdownMenu onItemClick={(item) => onActionItemClick(item)} items={[
                                        { id: 'mod', title: 'Modifier' },
                                        { id: 'cpy', title: 'Dupliquer' },
                                        { id: 'del', title: 'Supprimer' },
                                        { id: 'exp', title: 'Exporter' },
                                    ]} />
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                    {/* ACTION BUTTONS */}
                </div>
                <div className="w-2/5 pr-2 flex flex-col justify-between">
                    {/* SEARCH BOX */}
                    <div className="flex flex-row items-center w-full relative" ref={searchInputRef}>
                        <TextField
                            name="search_box"
                            id="search_box"
                            variant="outlined"
                            className="w-full"
                            autoComplete="off"
                            value={searchText}
                            onClick={() => setOpen(true)} // Open the popup when the input is clicked
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setOpen(false); // Close the popup when Enter is pressed
                                }
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start"
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',       // wrap onto next line
                                                alignItems: 'center',
                                                maxHeight: 'none !important',
                                                gap: '0.5rem',
                                                maxWidth: '100%',       // stay inside TextField
                                                overflow: 'visible',    // allow it to grow downward
                                                '& MuiInputAdornment-root': {
                                                    maxHeight: "none !important",
                                                }
                                            }}>
                                            <div style={{ display: 'contents', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {currentSearch.map((item, index) => (
                                                    <div 
                                                        key={`index-${index}`} 
                                                        className="flex flex-row max-w-full flex-wrap justify-start gap-1  pr-2 py-0 text-sm border border-gray-300 bg-gray-100 text-gray-800">
                                                        <div className="flex flex-row items-center h-full justify-start gap-1 bg-blue-700 text-white px-2 py-1">
                                                            <span>
                                                                {item.type === 'filter'
                                                                    ? (<FilterIcon color="blue" />)
                                                                    : item.type === 'group'
                                                                        ? (<GroupIcon color="blue" />)
                                                                        : <></>
                                                                }
                                                            </span>
                                                            {(item.type !== 'filter' && item.type !== 'group') && <span>{item.labelText}</span>}
                                                        </div>                                                        
                                                        {item.values.map((value, i) => {
                                                            return (
                                                                <span key={`value-${i}`} className="text-gray-500 font-semibold flex flex-row items-center px-1 py-0.5 bg-gray-200 mr-1">
                                                                    {value}
                                                                    {i < item.values.length - 1 && (item.type === 'group' ? <span className="text-gray-500">&nbsp;&gt;</span> : <span className="text-gray-500">&nbsp;ou</span>)}
                                                                </span>
                                                            );
                                                        })}
                                                        <button 
                                                            className="text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:font-semibold" 
                                                            onClick={() => {
                                                                setCurrentSearch(currentSearch.filter((_, i) => i !== index));
                                                            }}>
                                                            &times;
                                                        </button>
                                                    </div>)
                                                )}
                                            </div>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                            placeholder="Rechercher..."
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'slategray',
                                    padding: '5px',
                                },
                                '& .MuiInputBase-root': {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: '4px',
                                },
                                '& input': {
                                    minWidth: 0, // prevent the input from trying to take infinite space
                                    flex: '1 1 auto', // let it wrap as needed
                                },
                            }}
                        />
                        {/* Start Popup */}
                        <div className={`absolute top-full left-0 w-full z-30 h-48 bg-white shadow-md overflow-hidden ${open ? "" : "hidden"}`}>
                            <ul>
                                {searchOptions.map((option, index) => (
                                    <li className="cursor-pointer hover:bg-gray-200 h-8 flex flex-row items-center justify-start gap-1 px-4 text-md text-gray-800" 
                                        key={`index-${index}`}
                                        onClick={() => {
                                            if(searchText.length > 0) {
                                                setCurrentSearch((prevSearch) => {
                                                    if (prevSearch.some((item) => item.labelText === option.labelText)) {
                                                        // If the option is already selected, update its values
                                                        return prevSearch.map((item) => {
                                                            if (item.labelText === option.labelText) {
                                                                return {
                                                                    ...item,
                                                                    values: [...item.values, searchText],
                                                                };
                                                            }
                                                            return item;
                                                        });
                                                    } else {
                                                        // If the option is not selected, add it to the current search                                                    
                                                        return [
                                                            ...prevSearch,
                                                            {
                                                                type: 'seach',
                                                                field: option.field,
                                                                labelText: option.labelText,
                                                                values: [searchText],
                                                            },
                                                        ];
                                                    }

                                                });
                                                setSearchText(''); // Clear the search text after selection
                                            }
                                            setOpen(false); // Close the popup after selection
                                        }}>
                                        <span className="text-gray-500">Rechercher&nbsp;</span>
                                        <span className="text-gray-800 font-semibold">{option.labelText}</span>
                                        <span className="text-gray-500">pour</span>
                                        <span>:</span>
                                        <i className="text-blue-700">{searchText}</i>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* End Popup */}
                    </div>
                    {/* SEARCH BOX */}

                    <div className="flex flex-row items-center justify-between">
                        <div className="flex-1 flex flex-row items-center justify-start -ml-4">
                            <DropdownButton header={filterHeader} className="mx-2">
                                <FilterDropdownMenu onItemClick={handleFilterItemClick} items={filterItems}/>
                            </DropdownButton>

                            <DropdownButton header={groupHeader} className="mx-2">
                                <GroupDropdownMenu onItemClick={handleGroupItemClick} items={groupItems} />
                            </DropdownButton>

                            <DropdownButton header={favoritesHeader} className="mx-2" minWidth="min-w-72">
                                <FavoritesDropdownMenu onItemClick={handleFavItemClick} items={favoriteItems}/>
                            </DropdownButton>
                        </div>

                        <CustomTablePagination
                            onPageChange={handlePageChange}
                            onFromValueChanged={handleOnFromValueChanged}
                            onToValueChanged={handleOnToValueChanged}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={pageIndex}
                            count={rowsCount}
                            fromValue={fromValue}
                            toValue={toValue}
                        />
                    </div>
                </div>
            </div>            
        </div>
    );
}