import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ListElements.css';
import { jwtDecode } from 'jwt-decode'
 
function ListItems() {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { project } = location.state || {};
    const [longitudinalItems, setLongitudinalItems] = useState([]);
    const [name, setNameItem] = useState("");
    const [amount, setCantidadItem] = useState("");
 
    const handleLongitudinalChange = (index, field, value) => {
        const updatedItems = [...longitudinalItems];
        updatedItems[index][field] = value;
        setLongitudinalItems(updatedItems);
    };
 
    const addLongitudinalItem = () => {
        setLongitudinalItems([
            ...longitudinalItems,
            { cantidad: '', calibre: '', longitud: '' }, // Removed 'tipo' since it's not present in the inputs
        ]);
    };
 
    const removeLongitudinalItem = (index) => {
        const updatedItems = [...longitudinalItems];
        updatedItems.splice(index, 1);
        setLongitudinalItems(updatedItems);
    };
 
    const handleAddItems = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;
            const nameProject = project.nombre;
            const response = await fetch(`/api/projects/${userId}/${nameProject}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, amount })
            });
 
            if (response.ok) {        
                const data = await response.json();        
                console.log(data);
 
                // Limpiar los inputs
                setNameItem(""); // Limpiar el input de nombre del item
                setCantidadItem(""); // Limpiar el input de cantidad del item
                setLongitudinalItems([]); // Limpiar los elementos longitudinales
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching projects', error);
        }
     };
 
    return (
        <div className="list-elements-container">             
            <h2 className="section-title">Nombre de Item</h2>            
            <input 
                type="text" 
                className="input-field" 
                value={name}
                onChange={(e) => setNameItem(e.target.value)}
            />     
            <h2 className="section-title">Cantidad</h2>            
            <input 
                type="text" 
                className="input-field" 
                value={amount}
                onChange={(e) => setCantidadItem(e.target.value)}
            />       
            {/* Sección Longitudinal */}
            {longitudinalItems.map((item, index) => (
                <div key={index} className="input-row">
                    <input
                        type="number"
                        placeholder="Codigo"
                        value={item.cantidad}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'cantidad', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={item.calibre}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'calibre', e.target.value)
                        }
                        className="input-field"
                    />
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={item.longitud}
                        onChange={(e) =>
                            handleLongitudinalChange(index, 'longitud', e.target.value)
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
 
            <div>
            
                <button
                    className="add-1-button"
                    onClick={handleAddItems}
                >
                    Añadir Item
                </button>
            </div>
 
        </div>
    );
}
 
export default ListItems;