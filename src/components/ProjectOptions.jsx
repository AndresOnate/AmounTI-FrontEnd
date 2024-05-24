import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/ProjectOptions.css';

const ProjectOptions = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { project } = location.state || {};
    console.log(project);

    const handleListElements = () => {
        navigate('/listelements',  { state: { project } });
    };

    const handleViewElements = () => {
        navigate('/viewelements',  { state: { project } });
    };

    const handleListItems = () => {
        navigate('/listitems',  { state: { project } });
    };

    const handleViewItems = () => {
        navigate('/viewitems',  { state: { project } });
    };

    const handlePrintResults = () => {
        navigate('/resultsattributes',  { state: { project } });
    };

    const token = localStorage.getItem('token');
    return (
        <div className="project-options">
            <h1>Proyecto - {project.nombre}</h1>
            <button onClick={handleListElements}>Listar elementos</button>
            <button onClick={handleViewElements}>Ver elementos</button>
            <button onClick={handleListItems}>Listar items</button>
            <button onClick={handleViewItems}>Ver items</button>
            <button onClick={handlePrintResults}>Imprimir resultados</button>
        </div>
    );
};

export default ProjectOptions;