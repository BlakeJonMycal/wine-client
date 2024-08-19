import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./WineList.css";

export const AllWines = () => {
    const [allWines, setAllWines] = useState([]);
    const [filterRegion, setFilterRegion] = useState('');
    const [filterName, setFilterName] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const getAllWinesFromTheAPI = async (region = '', name = '') => {
        const url = "http://localhost:8000/wines";
        const params = [];

        if (region) params.push(`region=${region}`);
        if (name) params.push(`name=${name}`)
        
        if (params.length) url += `?${params.join('&')}`

        const response = await fetch(url, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        });
        const parsedJSONString = await response.json();
        setAllWines(parsedJSONString);
    };

    useEffect(() => { getAllWinesFromTheAPI() }, []);

    const handleFilterRegionChange = (event) => {
        setFilterRegion(event.target.value);
    };

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        getAllWinesFromTheAPI(filterRegion, filterName);
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

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
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
                            onChange={handleFilterChange}
                        />
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


