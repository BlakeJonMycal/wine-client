import { useEffect, useState } from 'react';

export const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProfileDataFromApi = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/profiles/me", {
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("wine_token")).token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const parsedJSONString = await response.json();
            setProfileData(parsedJSONString);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { getProfileDataFromApi() }, []);

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && (
                <div>
                    <h2>{profileData.username}</h2>
                    <p>Email: {profileData.email}</p>
                    <p>Name: {profileData.first_name} {profileData.last_name}</p>
                </div>
            )}
        </div>
    );
};