import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ModDarts = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.dartsId;
    const [showModal, setShowModal] = useState(false);
    const [hiba,setHiba] =useState(null);
    const [darts, setDarts] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
useEffect(()=>{
    const adatokLehivasa = async() => {
        try {
            const valasz = await axios.get(`https://darts.sulla.hu/darts/${id}`);
            setDarts(valasz.data);
        }
        catch(error) {
            setHiba(error);
            console.log("Hiba: ", hiba);
        }
    };
    adatokLehivasa();
}, [id]);
const kuldesKezelo = async(event) => {
    event.preventDefault();
    try {
        const { name, birth_date, world_ch_won, profile_url, image_url } = darts;
        await axios.put(`https://darts.sulla.hu/darts/${id}`, {
            name, birth_date, world_ch_won: Number(world_ch_won), profile_url, image_url
        })
        .then(()=> {setShowModal(true);})    
    }
    catch(error) {setHiba(error);}
};
const valtozasKezelo = (event) => {
    const { name, value } = event.target;
    setDarts(prevState => ({
        ...prevState,
        [name]: value
    }));
};
    return(
        <>
        <div className="p-5 content bg-ivory text-center">
            {hiba && <p role="alert" className="text-danger">{hiba.message ?? hiba}</p>}
            <form onSubmit={kuldesKezelo}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" 
                        value={darts.name ?? ''} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" 
                         value={darts.birth_date?.slice(0, 10) ?? ''} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" 
                         value={darts.world_ch_won ?? ''} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control"
                         value={darts.profile_url ?? ''} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control"
                         value={darts.image_url ?? ''} onChange={valtozasKezelo} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success" disabled={darts.id == null}>
                    <i className="bi bi-send"></i>&nbsp;&nbsp;Küldés
                </button>
            </form>
        </div>
        {showModal && (
            <div className="modal fade show d-block" tabIndex="-1"
            style={{zIndex: 1055}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Sikeres módosítás!</h5>
                        </div>
                        <div className="modal-body">
                            A dartsozó adatait sikeresen módosítottuk!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                            onClick={()=>navigate("/")}>Rendben</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}