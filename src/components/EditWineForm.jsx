import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditWineForm = () => {
    const { wineId } = useParams();
    const navigate = useNavigate();
    const [styles, setStyles] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        region: '',
        vintage: '',
        abv: '',
        tasting_notes: '',
        grape_variety: '',
        vineyard: '',
        image_url: '',
        rating: '',
        styles: []
    });

    useEffect(() => {
        const getWineDetailsFromAPI = async () => {
            const response = await fetch(`http://localhost:8000/wines/${wineId}`, {
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
                }
            });
            const data = await response.json();
            setFormData({
                name: data.name,
                region: data.region,
                vintage: data.vintage,
                abv: data.abv,
                tasting_notes: data.tasting_notes,
                grape_variety: data.grape_variety,
                vineyard: data.vineyard,
                image_url: data.image_url,
                rating: data.rating,
                styles: data.styles.map(style => style.id)
            });
        };

        const getStylesFromAPI = async () => {
            const response = await fetch('http://localhost:8000/styles', {
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
                }
            });
            const data = await response.json();
            setStyles(data);
        };

        getWineDetailsFromAPI();
        getStylesFromAPI();
    }, [wineId]);

    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        if (name === 'styles') {
            const styleId = parseInt(value);
            setFormData(prevState => ({
                ...prevState,
                styles: checked
                    ? [...prevState.styles, styleId] // Add the style if it's not already present
                    : prevState.styles.filter(id => id !== styleId) // Remove the style if it is present
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:8000/wines/${wineId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                styles: formData.styles.map(id => parseInt(id))
            })
        });

        if (response.ok) {
            alert('Wine updated successfully!');
            navigate('/mywines');
        } else {
            alert('Failed to update wine.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Region</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} required />
            </div>
            <div>
                <label>Vintage</label>
                <input type="number" name="vintage" value={formData.vintage} onChange={handleChange} required />
            </div>
            <div>
                <label>abv</label>
                <input type="number" name="abv" value={formData.abv} onChange={handleChange} required />
            </div>
            <div>
                <label>Tasting Notes</label>
                <input type="text" name="tasting_notes" value={formData.tasting_notes} onChange={handleChange} required />
            </div>
            <div>
                <label>Grape Variety</label>
                <input type="text" name="grape_variety" value={formData.grape_variety} onChange={handleChange} required />
            </div>
            <div>
                <label>Vineyard</label>
                <input type="text" name="vineyard" value={formData.vineyard} onChange={handleChange} required />
            </div>
            <div>
                <label>Image URL</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
            </div>
            <div>
                <label>Rating</label>
                <select name="rating" value={formData.rating} onChange={handleChange} required>
                    <option value="" disabled>Choose a rating</option>
                    {[...Array(5).keys()].map(num => (
                        <option key={num} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Style</label>
                {styles.map(style => (
                    <div key={style.id}>
                        <input
                            type="checkbox"
                            name="styles"
                            value={style.id}
                            checked={formData.styles.includes(style.id)}
                            onChange={handleChange}
                        />
                        <label>{style.name}</label>
                    </div>
                ))}
            </div>
            <button type="submit">Update Wine</button>
        </form>
    );
};
