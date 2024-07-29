import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./WineList.css"; // Import the same CSS file as UserWines

export const AllWines = () => {
    const [allWines, setAllWines] = useState([]);

    const getAllWinesFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/wines", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        });
        const parsedJSONString = await response.json();
        setAllWines(parsedJSONString);
    };

    useEffect(() => { getAllWinesFromTheAPI() }, []);
    
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
            <div className="cellar-container">
                {displayAllWines()}
            </div>
        </div>
    );
};
