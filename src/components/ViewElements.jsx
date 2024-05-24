import React, { useEffect, useState } from 'react';
import '../css/ViewElements.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
 
const ElementTable = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();
    const { project } = location.state || {};
    const [data, setData] = useState([]);
 
    useEffect(() => {
        handleShowElementName();
    }, []);
 
    const handleShowElementName = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const nameProject = project.nombre;
            const response = await fetch(`/api/projects/${userId}/${nameProject}/elements`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
 
            if (response.ok) {
                const responseData = await response.json();
                // Transform the responseData object into an array if needed
                const projectsNameArray = Object.values(responseData);
                setData(projectsNameArray); // Update the data state
            } else {
                // Handle error response
                console.error('Error fetching name elements', response.statusText);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching name elements', error);
        }
    };
 
    if (data.length < 1) {
        return <div>Cargando datos...</div>; // Mostrar un mensaje de carga mientras los datos se están obteniendo
    }
 
    return (
        <div className="element-table-container">
            <table className="element-table">
                <thead>
                    <tr>
                        <th>Nombre del Elemento</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => (
                        <tr key={index}>
                            <td>{element.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
export default ElementTable;