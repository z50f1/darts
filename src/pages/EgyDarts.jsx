import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const EgyDarts =()=> {
  const params = useParams();
  const id = params.dartsId;
  const [dartsozo, setDartsozo] = useState([]);
  const [tolt, setTolt] = useState(false);
  const [hiba, setHiba] = useState(null);

  useEffect(()=>{
    setTolt(true);
    axios
    .get(`https://darts.sulla.hu/darts/${id}`)
    .then((res) => setDartsozo(res.data))
    .catch((error) => {
        setHiba(error);
        console.error("Hiba: ", error)})
    .finally(()=> setTolt(false));
    },[id]);
return(
     <div className="p-5 m-auto text-center content bg-ivory">
    {hiba && <p role="alert" className="text-danger">{hiba.message}</p>}
    {tolt ? 
    <div className="spinner-border text-warning"></div> : 
    <div>
        <h2>Dartsozó adatai</h2>
            <div className="card p-3">
                <h5 className="card-title">Dartsozó neve: { dartsozo.name }</h5>
                <p className="lead">Születési éve: { dartsozo.birth_date }</p>
                <p className="lead">Nyert világbajnokságai: { dartsozo.world_ch_won }</p>
            <div className="card-body">
                <Link to={ dartsozo.profile_url } target="_blank">
                Profil link</Link><br />
                <Link to={ "/"}>
                <img alt={ dartsozo.name } 
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={ dartsozo.image_url || "https://placehold.co/400x800" } /></Link> 
                <br />
                <Link to={ "/" }>
                <i className="bi bi-arrow-return-left fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/mod-darts/" + dartsozo.id}>
                <i className="bi bi-pencil fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/del-darts/" + dartsozo.id}>
                <i className="bi bi-trash3 fs-2"></i></Link>
            </div>
            </div>
    </div>
    }
    </div>
);
}