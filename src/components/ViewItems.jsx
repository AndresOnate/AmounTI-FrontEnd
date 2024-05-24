import React from 'react';
import { useEffect, useState } from 'react';
import '../css/ViewElements.css';
import { jwtDecode } from 'jwt-decode'
import { useLocation } from 'react-router-dom';

const ItemTable = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { project } = location.state || {};
    const [data, setData] = useState([]);

    useEffect(() => {
        handleShowItemName();
    }, []);

    const handleShowItemName = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const nameProject = project.nombre;
            const response = await fetch(`http://ec2-3-81-217-64.compute-1.amazonaws.com:35000/v1/projects/${userId}/${nameProject}/items`, {
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
                console.log(projectsNameArray);
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
                        <th>Nombre del Item</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default ItemTable;