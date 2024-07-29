import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WineDetails.css'; 

export const WineDetails = () => {
    const { wineId } = useParams();
    const [wine, setWine] = useState(null);
    const navigate = useNavigate()

    const getWineDetailsFromAPI = async () => {
        const response = await fetch(`http://localhost:8000/wines/${wineId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        });
        const parsedJSONString = await response.json();
        setWine(parsedJSONString);
    }

    useEffect(() => {
        getWineDetailsFromAPI();
    }, [wineId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/wines/${wineId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
                }
            })
            if (response.status === 204) {
                navigate('/mywines')
            }
        } catch (error) {
            console.error('Error Deleting Wine', error)
        } 
    }

    if (!wine) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wine-details-container">
            <div className="wine-info">
                <h1 className="wine-title">{wine.name}</h1>
                <p><strong>Region:</strong> {wine.region}</p>
                <p><strong>Vintage:</strong> {wine.vintage}</p>
                <p><strong>ABV:</strong> {wine.abv}%</p>
                <p><strong>Vineyard:</strong> {wine.vineyard}</p>
                <p><strong>Grape Varieties:</strong> {wine.grape_variety}</p>
                <p><strong>Tasting Notes:</strong> {wine.tasting_notes}</p>
                <p><strong>Rating:</strong> {wine.rating}</p>
                <p><strong>Styles:</strong></p>
                <ul>
                    {wine.styles.map(style => (
                        <li key={style.id}>{style.name}</li>
                    ))}
                </ul>
                {wine.is_owner && (
                    <div className="wine-actions">
                        <button 
                            onClick={handleDelete}
                            className="delete-button"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate(`/editwine/${wineId}`)}
                            className="edit-button"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <img src={wine.image_url} className="wine-image" alt="Wine" />
        </div>
    );
}

