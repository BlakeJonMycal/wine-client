import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./WineList.css"

export const UserWines = () => {
    const [userWines, setUserWines] = useState([])


    const getUserWinesFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/wines?mine=true", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setUserWines(parsedJSONString)
    }

    useEffect(() => { getUserWinesFromTheAPI() }, [])
    
    const displayUserWines = () => {
        if (userWines && userWines.length) {
            return userWines.map(userWine => (
                <div key={`key-${userWine.id}`} className="cellar-card">
                    <Link to={`/wines/${userWine.id}`}>
                        <img src={userWine.image_url} alt={userWine.name} className="wine-image" />
                    </Link>
                    <div>
                        <Link to={`/wines/${userWine.id}`} className="cellar-card-link">
                            {userWine.name}
                        </Link>
                    </div>
                </div>
            ));
        }
    };
    

    return (
        <section className="cellar-page">
            <h1 className="cellar-title"></h1>
            <section className="cellar-container">
                {displayUserWines()}
            </section>
        </section>
    )
} 
