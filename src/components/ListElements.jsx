import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ListElements.css';
import { jwtDecode } from 'jwt-decode'
 
function ListElements() {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { project } = location.state || {};
    const [longitudinalItems, setLongitudinalItems] = useState([]);
    const [flejeItems, setFlejeItems] = useState([]);
    const [nameElement, setNameElement] = useState("");
 
    const handleLongitudinalChange = (index, field, value) => {
        const updatedItems = [...longitudinalItems];
        updatedItems[index][field] = value;
        setLongitudinalItems(updatedItems);
    };
 
    const handleFlejeChange = (index, field, value) => {
        const updatedItems = [...flejeItems];
        updatedItems[index][field] = value;
        setFlejeItems(updatedItems);
    };
 
    const addLongitudinalItem = () => {
        setLongitudinalItems([
            ...longitudinalItems,
            { cantidad: '', calibre: '', longitud: '', tipo: '' },
        ]);
    };
 
    const addFlejeItem = () => {
        setFlejeItems([
            ...flejeItems,
            { cantidad: '', calibre: '', longitud: '', ancho: '' },
        ]);
    };
 
    const removeLongitudinalItem = (index) => {
        const updatedItems = [...longitudinalItems];
        updatedItems.splice(index, 1);
        setLongitudinalItems(updatedItems);
    };
 
    const removeFlejeItem = (index) => {
        const updatedItems = [...flejeItems];
        updatedItems.splice(index, 1);
        setFlejeItems(updatedItems);
    };
 
    const handleAddElements = async (index) => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const nameProject = project.nombre;
            const response = await fetch(`/api/projects/${userId}/${nameProject}/elements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: nameElement
            });
 
            if (response.ok) {        
                const data = await response.json();        
                console.log(data);
 
                // Limpiar los inputs
                setNameElement(""); // Limpiar el input de nombre del elemento
                setLongitudinalItems([]); // Limpiar los elementos longitudinales
                setFlejeItems([]); // Limpiar los elementos de fleje
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching projects', error);
        }
     };
 
    return (
        <div className="list-elements-container">             
            <h2 className="section-title">Nombre del Elemento</h2>            
            <input 
                type="text" 
                className="input-field" 
                value={nameElement}
                onChange={(e) => setNameElement(e.target.value)}
            />            
            {/* Sección Longitudinal */}
            <h2 className="section-title">Longitudinal</h2>
            {longitudinalItems.map((item, index) => (
                <div key={index} className="input-row">
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={item.cantidad}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'cantidad', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Calibre"
                        value={item.calibre}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'calibre', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Longitud (cm)"
                        value={item.longitud}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'longitud', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Tipo"
                        value={item.tipo}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'tipo', e.target.value)
                        }
                        className="input-field"
                    />
                    <button
                        onClick={() => removeLongitudinalItem(index)}
                        className="remove-button"
                    >
                        Eliminar
                    </button>
                
                </div>
            ))}
            <button onClick={addLongitudinalItem} className="add-button">
                Añadir Longitudinal
            </button>
 
            {/* Sección Fleje */}
            <h2 className="section-title">Fleje</h2>
            {flejeItems.map((item, index) => (
                <div key={index} className="input-row">
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={item.cantidad}
                        onChange={(e) =>
                            handleFlejeChange(index, 'cantidad', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Calibre"
                        value={item.calibre}
                        onChange={(e) =>
                            handleFlejeChange(index, 'calibre', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Longitud (cm)"
                        value={item.longitud}
                        onChange={(e) =>
                            handleFlejeChange(index, 'longitud', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Ancho (cm)"
                        value={item.ancho}
                        onChange={(e) =>
                            handleFlejeChange(index, 'ancho', e.target.value)
                        }
                        className="input-field"
                    />
                    <button
                        onClick={() => removeFlejeItem(index)}
                        className="remove-button"
                    >
                        Eliminar
                    </button>
 
                </div>
            ))}
            <button onClick={addFlejeItem} className="add-button">
                Añadir Fleje
            </button>
 
            <div>
            
                <button
                    className="add-1-button"
                    onClick={handleAddElements}
                >
                    Añadir Elemento
                </button>
            </div>
 
        </div>
    );
}
 
export default ListElements;