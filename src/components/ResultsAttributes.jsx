import React, { useState } from 'react';
import '../css/ResultsAttributes.css';

const ResultsAttributes = () => {
  const [showPopup, setShowPopup] = useState(false);

  const attributes = [
    { label: 'Resumen de acero por items', value: 'resumenAceroItems' },
    { label: 'Cuadro de aceros', value: 'cuadroAceros' },
    { label: 'Listado de Items', value: 'listadoItems' },
    { label: 'Listado de elementos', value: 'listadoElementos' },
    { label: 'Resumen de acero por items y diámetros', value: 'resumenAceroItemsDiametros' },
  ];

  const handlePrint = () => {
    setShowPopup(true);
    // Simular el proceso de generación del documento
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Esto simula un retraso de 2 segundos antes de que se cierre el popup
  };

  return (
    <div className="results-attributes">
      <h2>Imprimir Resultados</h2>
      {attributes.map((attribute, index) => (
        <div key={index} className="attribute">
          <input type="checkbox" id={attribute.value} />
          <label htmlFor={attribute.value}>{attribute.label}</label>
        </div>
      ))}
      <button onClick={handlePrint}>Imprimir</button>
      {showPopup && (
        <div className="popup">
          <p>El documento se generó de manera exitosa</p>
        </div>
      )}
    </div>
  );
};

export default ResultsAttributes;
