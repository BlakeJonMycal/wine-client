import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const AllWines = () => {
    const [allWines, setAllWines] = useState([])


    const getAllWinesFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/wines", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setAllWines(parsedJSONString)
    }

    useEffect(() => { getAllWinesFromTheAPI() }, [])
    
    const displayAllWines = () => {
        if (allWines && allWines.length) {
            return allWines.map(allWine => (
                <div key={`key-${allWine.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                    <div>
                        <Link to={`/allwines/${allWine.id}`} className="text-blue-500 hover:underline">
                            {allWine.name}
                        </Link>
                    </div>
                 </div>
            ))
        }
    } 
    

    return (
        <>
            <h1 className="text-3xl">Explore All Wines</h1>
            {displayAllWines()}
        </>
    )
}  