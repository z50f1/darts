import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DelDarts =() => {
 const params = useParams();
 const id = params.dartsId;
 const navigate = useNavigate();
 const [darts, setDarts] = useState({});
 const [probaId, setProbaId] = useState(null);
 const [torol, setTorol] = useState(false);
 const [showModal, setShowModal] = useState(false);
  const [hiba, setHiba] = useState(null);
  
  useEffect(()=>{
    axios
    .get(`https://darts.sulla.hu/darts/${id}`)
    .then((res) => setDarts(res.data))
    .catch((error) => {
        setHiba(error);
        console.error("Hiba: ", error)})
    },[id]);
return(
    <>
     <div className="p-5 m-auto text-center content bg-ivory">
    <div>
        <h2>Törlési próba adatai:</h2>
            <div className="card p-3">
                <h5 className="card-title">Dartsozó neve: { darts.name }</h5>
                <p className="lead">Születési éve: { darts.birth_date }</p>
                <p className="lead">Nyert világbajnokságai: { darts.world_ch_won }</p>
            <div className="card-body">
                <Link to={ darts.profile_url } target="_blank" className="btn btn-primary">
                Profil link</Link><br /><br />
                <Link to={ "/"}>
                <img alt={ darts.name } 
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={ darts.image_url || "https://placehold.co/400x800" } /></Link> 
                <br /><br />
                <Link to={ "/" } className="btn btn-warning">
                <i className="bi bi-arrow-return-left fs-2"></i></Link>
            </div>
            <form onSubmit={async (event) => {
                event.preventDefault();
                setTorol(true);
                setHiba(null);
                try {
                    let ujId = probaId;
                    if (ujId === null) {
                        const { birth_date, world_ch_won, profile_url, image_url } = darts;
                        const { data } = await axios.post('https://darts.sulla.hu/darts', {
                            name: 'Törlési próba ' + crypto.randomUUID(),
                            birth_date, world_ch_won: Number(world_ch_won), profile_url, image_url
                        });
                        if (!Number.isSafeInteger(data?.id) || data.id < 1) {
                            throw new Error('A POST válaszában nincs érvényes azonosító.');
                        }
                        ujId = data.id;
                        setProbaId(ujId);
                    }
                    await axios.delete(`https://darts.sulla.hu/darts/${ujId}`);
                    setProbaId(null);
                    setShowModal(true);
                } catch (error) {
                    setHiba(error);
                } finally {
                    setTorol(false);
                }
            }}>
                {hiba && <p role="alert" className="text-danger">{hiba.message}</p>}
                <button type="submit" className="btn btn-danger" disabled={torol || darts.id == null}>
                    {probaId === null ? 'Próbarekord létrehozása és törlése' : 'Törlés újrapróbálása'}
                </button>
            </form>
            </div>
    </div>
    </div>
     {showModal && (
            <div className="modal fade show d-block" tabIndex="-1"
            style={{zIndex: 1055}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Sikeres törlés!</h5>
                        </div>
                        <div className="modal-body">
                            A létrehozott próbarekordot sikeresen töröltük!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                            onClick={()=>navigate("/")}>Rendben</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
);

}