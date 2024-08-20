import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./WineList.css";

export const AllWines = () => {
    const [allWines, setAllWines] = useState([]);
    const [filterRegion, setFilterRegion] = useState('');
    const [filterName, setFilterName] = useState('');
    const [styles, setStyles] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getAllWinesFromTheAPI = async (region = '', name = '', selectedStyles = []) => {
        let url = "http://localhost:8000/wines";
        const params = [];

        if (region) params.push(`region=${region}`);
        if (name) params.push(`name=${name}`);
        if (selectedStyles.length) {
            selectedStyles.forEach(style => params.push(`styles=${style}`));
        }

        if (params.length) url += `?${params.join('&')}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        });
        const parsedJSONString = await response.json();
        setAllWines(parsedJSONString);
    };

    const getStylesFromTheApi = async () => {
        const response = await fetch("http://localhost:8000/styles", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        });
        const stylesData = await response.json();
        setStyles(stylesData);
    };

    useEffect(() => {
        getAllWinesFromTheAPI();
        getStylesFromTheApi();
    }, []);

    const handleFilterRegionChange = (event) => {
        setFilterRegion(event.target.value);
    };

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedStyles((prevSelectedStyles) => {
            if (prevSelectedStyles.includes(value)) {
                return prevSelectedStyles.filter(style => style !== value);
            } else {
                return [...prevSelectedStyles, value];
            }
        });
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        getAllWinesFromTheAPI(filterRegion, filterName, selectedStyles);
    };

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const displayAllWines = () => {
        if (allWines && allWines.length) {
            return allWines.map(allWine => (
                <div key={`key-${allWine.id}`} className="cellar-card">
                    <Link to={`/allwines/${allWine.id}`}>
                        <img src={allWine.image_url} alt={allWine.name} className="wine-image" />
                    </Link>
                    <div>
                        <Link to={`/allwines/${allWine.id}`} className="cellar-card-link">
                            {allWine.name}
                        </Link>
                    </div>
                </div>
            ));
        }
    };

    return (
        <div className="cellar-page">
            <div className={`side-panel ${isPanelOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={togglePanel}>
                    {isPanelOpen ? '←' : '→'}
                </button>
                {isPanelOpen && (
                    <form onSubmit={handleFilterSubmit} className="filter-form">
                        <input
                            type="text"
                            placeholder="Enter region"
                            value={filterRegion}
                            onChange={handleFilterRegionChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Wine Name"
                            value={filterName}
                            onChange={handleFilterNameChange}
                        />

                        <div className="dropdown">
                            <button type="button" onClick={toggleDropdown} className="dropdown-toggle">
                                Filter by Styles
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    {styles.map(style => (
                                        <label key={style.id} className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                value={style.id}
                                                checked={selectedStyles.includes(style.id.toString())}
                                                onChange={handleCheckboxChange}
                                            />
                                            {style.name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit">Filter</button>
                    </form>
                )}
            </div>
            <div className="cellar-container">
                {displayAllWines()}
            </div>
        </div>
    );
};



