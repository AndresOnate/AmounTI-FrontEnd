import React from 'react';
import { useEffect, useState } from 'react';
import '../css/TableProjects.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const TableProjects = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para rastrear si los datos están cargados

    useEffect(() => {
        handleShowProjects();
    }, []);

    function handleEditProject(index) {
        const project = data[index];
        navigate('/projectoptions', { state: { project } });
    };

    const handleShowProjects = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const response = await fetch(`http://ec2-3-81-217-64.compute-1.amazonaws.com:35000/v1/projects/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                // Transform the responseData object into an array if needed
                const projectsArray = Object.values(responseData);
                setData(projectsArray); // Update the data state
                console.log(projectsArray);
                setIsLoading(false); // Indicate that data has loaded

            } else {
                // Handle error response
                console.error('Error fetching projects', response.statusText);
                setIsLoading(false);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching projects', error);
            setIsLoading(false); // Incluso si hay un error, indicar que la carga ha terminado
        }
    };

    if (data.length < 1) {
        return <div>Cargando datos...</div>; // Mostrar un mensaje de carga mientras los datos se están obteniendo
    }

    // Renderizar la tabla solo si data tiene contenido
    return (
        <table className="table-component">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Varillas</th>
                    <th>Elementos</th>
                    <th>Items</th>
                    <th>ItemsCantidades</th>
                    <th>PesoUnitarioItem</th>
                    <th>PesoTotalItem</th>
                    <th>PesoUnitarioItem</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((project, index) => (

                    <tr key={index}>
                        <td>{project.nombre}</td>
                        <td>{project.varillas}</td>
                        <td>
                            {/* Iterar sobre las propiedades del objeto elementos */}
                            <ul>
                                {Object.entries(project.elementos).map(([key, value]) => (
                                    <li key={key}>
                                        {key}: {JSON.stringify(value)}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>{JSON.stringify(project.items)}</td>
                        <td>{JSON.stringify(project.itemsCantidades)}</td>
                        <td>{JSON.stringify(project.pesoUnitarioItem)}</td>
                        <td>{JSON.stringify(project.pesoTotalItem)}</td>
                        <td>{JSON.stringify(project.PesoUnitarioItem)}</td>
                        <td><button onClick={() => handleEditProject(index)}>editar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableProjects;