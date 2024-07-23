import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
                <div key={`key-${userWine.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                    <div>
                        <Link to={`/wines/${userWine.id}`} className="text-blue-500 hover:underline">
                            {userWine.name}
                        </Link>
                    </div>
                 </div>
            ))
        }
    } 
    

    return (
        <>
            <h1 className="text-3xl">My Cellar</h1>
            {displayUserWines()}
        </>
    )




} 
