import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        }catch (error) {
        console.error('Error Deleting Wine', error)
        } 
    }

    if (!wine) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl">{wine.name}</h1>
            <img src={wine.image_url} className="wine_image" />
            <p><strong>Region:</strong> {wine.region}</p>
            <p><strong>Vintage:</strong> {wine.vintage}</p>
            <p><strong>abv:</strong> {wine.abv}%</p>
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
                <button 
                    onClick={handleDelete}
                    className="border border-solid bg-red-700 text-white p-1 mt-4"
                >
                    Delete
                </button>
            )}
        </div>
    );
}

