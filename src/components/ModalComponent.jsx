import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { jwtDecode } from 'jwt-decode'

const ModalComponent = (props) => {

  const [value, setValue] = useState('');
  const { isOpen, toggle, onConfirm } = props;
  const token  = localStorage.getItem('token');
  const handleConfirm = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      const response = await fetch(`/api/projects/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: value
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onConfirm(value);
      } else {
        // Handle error response
        console.error('Error creating project', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error creating project', error);
    }

    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ingresa el nombre del proyecto</ModalHeader>
      <ModalBody>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;

