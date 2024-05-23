import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ListElements.css';

function ListElements() {
  const location = useLocation();
  const { project } = location.state || {};
  const [longitudinalItems, setLongitudinalItems] = useState([]);
  const [flejeItems, setFlejeItems] = useState([]);

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

  return (
    <div>
      {/* Sección Longitudinal */}
      <h2>Longitudinal</h2>
      {longitudinalItems.map((item, index) => (
        <div key={index}>
          <input
            type="number"
            placeholder="Cantidad"
            value={item.cantidad}
            onChange={(e) =>
              handleLongitudinalChange(index, 'cantidad', e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Calibre"
            value={item.calibre}
            onChange={(e) =>
              handleLongitudinalChange(index, 'calibre', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Longitud (cm)"
            value={item.longitud}
            onChange={(e) =>
              handleLongitudinalChange(index, 'longitud', e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Tipo"
            value={item.tipo}
            onChange={(e) =>
              handleLongitudinalChange(index, 'tipo', e.target.value)
            }
          />
          <button onClick={() => removeLongitudinalItem(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={addLongitudinalItem}>Añadir Longitudinal</button>

      {/* Sección Fleje */}
      <h2>Fleje</h2>
      {flejeItems.map((item, index) => (
        <div key={index}>
          <input
            type="number"
            placeholder="Cantidad"
            value={item.cantidad}
            onChange={(e) =>
              handleFlejeChange(index, 'cantidad', e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Calibre"
            value={item.calibre}
            onChange={(e) =>
              handleFlejeChange(index, 'calibre', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Longitud (cm)"
            value={item.longitud}
            onChange={(e) =>
              handleFlejeChange(index, 'longitud', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Ancho (cm)"
            value={item.ancho}
            onChange={(e) =>
              handleFlejeChange(index, 'ancho', e.target.value)
            }
          />
          <button onClick={() => removeFlejeItem(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={addFlejeItem}>Añadir Fleje</button>
    </div>
  );
};

export default ListElements;
