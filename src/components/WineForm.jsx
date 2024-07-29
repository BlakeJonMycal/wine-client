import React, { useState, useEffect } from 'react';
import './WineForm.css'; // Import the CSS file

export const WineForm = () => {
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
        const getStylesFromAPI = async () => {
            const response = await fetch('http://localhost:8000/styles', {
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
                }
            });
            const data = await response.json();
            setStyles(data);
        }

        getStylesFromAPI();
    }, []);

    const handleChange = (event) => {
        const { name, checked, value } = event.target;
        if (name === 'styles') {
            const styleId = parseInt(value)
            setFormData(prevState => ({
                ...prevState,
                styles: checked
                    ? [...prevState.styles, styleId] // Add the style if it's not already present
                    : prevState.styles.filter(id => id !== styleId) // Remove the style if it is present
            }));
        } else {
            // Handle other fields as before
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/wines', {
            method: 'POST',
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                style: formData.styles.map(id => parseInt(id))
            })
        });

        if (response.ok) {
            alert('Wine added successfully!');
            window.location.href = '/mywines'
        } else {
            alert('Failed to add wine.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="wine-form">
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Region</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Vintage</label>
                <input type="number" name="vintage" value={formData.vintage} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>ABV</label>
                <input type="number" name="abv" value={formData.abv} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Tasting Notes</label>
                <input type="text" name="tasting_notes" value={formData.tasting_notes} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Grape Variety</label>
                <input type="text" name="grape_variety" value={formData.grape_variety} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Vineyard</label>
                <input type="text" name="vineyard" value={formData.vineyard} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Rating</label>
                <select name="rating" value={formData.rating} onChange={handleChange} required>
                    <option value="" disabled>Choose a rating</option>
                    {[...Array(5).keys()].map(num => (
                        <option key={num} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Style</label>
                {styles.map(style => (
                    <div key={style.id} className="checkbox-group">
                        <input
                            type="checkbox"
                            name="styles"
                            value={style.id}
                            checked={!!formData.styles.find(s => s === style.id)} 
                            onChange={handleChange}
                        />
                        <label>{style.name}</label>
                    </div>
                ))}
            </div>
            <button type="submit" className="submit-button">Add Wine</button>
        </form>
    );
}

