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
    <div className="list-elements-container">
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
    </div>
  );
}

export default ListElements;