import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsLista = () => {
    const [dartsozok, setDartsozok] = useState([]);
    const [tolt, setTolt] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(()=> {
        setTolt(true);
        axios
        .get("https://darts.sulla.hu/darts")
        .then((res) => setDartsozok(res.data))
        .catch((error) => {
            setHiba(error);
            console.error("Hiba: ", error)})
        .finally(()=> setTolt(false));
        },[]);
return (
    <div className="p-5 m-auto text-center content bg-ivory">
    {hiba && <p role="alert" className="text-danger">{hiba.message}</p>}
    {tolt ? 
    <div className="spinner-border text-warning"></div> : 
    <div>
        <h2>Dartsozók</h2>
        {dartsozok.map((dartsozo, index) =>(
            <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                <p className="text-dark">Dartsozó neve: { dartsozo.name }</p>
                <p className="text-danger">Születési éve: { dartsozo.birth_date }</p>
                <p className="text-danger">Nyert világbajnokságai: { dartsozo.world_ch_won }</p>
            <div className="card-body">
                <Link to={ dartsozo.profile_url } className="btn btn-primary" target="_blank">
                Profil link</Link><br /><br />
                <Link to={ "/darts/" + dartsozo.id }>
                <img alt={ dartsozo.name } 
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={ dartsozo.image_url || "https://placehold.co/400x800" } /></Link> 
                <br />
                <Link to={ "/darts/" + dartsozo.id }>
                <i className="bi bi-eye fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/mod-darts/" + dartsozo.id}>
                <i className="bi bi-pencil fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/del-darts/" + dartsozo.id}>
                <i className="bi bi-trash3 fs-2"></i></Link>
            </div>
            </div>
        ))}
    </div>
    
    }
    </div>
);
}