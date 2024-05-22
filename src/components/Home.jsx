import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import ModalComponent from '../components/ModalComponent';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AmounTIContext } from "../AmounTIContext";


const Home = () => {
    
    const { token, login, logout } = useContext(AmounTIContext);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
          logout();
          navigate('/auth');
          
        }else {
            login();
        }
    }, [navigate]);   


    const [selectedFiles, setSelectedFiles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    const handleConfirm = async (value) => {
        console.log(`Proyecto creado con el nombre "${value}"`);

    };
    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                <h2 className="text-center">AmounTI</h2>
                </div>
                <div className="card-body">
                <button className="btn btn-primary btn-block" onClick={handleModalToggle}>
                    Crear proyecto
                </button>
                <ModalComponent
                    isOpen={modalOpen}
                    toggle={handleModalToggle}
                    onConfirm={handleConfirm}
                />
                <button className="btn btn-primary btn-block">
                    Ver Proyectos
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;
