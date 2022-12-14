import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "../../css/rev.css";
import { Link, useHistory } from "react-router-dom";
import "../../css/perfilrev.css";
import DeleteReview from "../DeleteReview/DeleteReview";

export default function ReviewCard() {
  const history = useHistory();
  const [user, setUser] = useState({});
  let reviewArray = useSelector((state) => state.allReviews);
  const rev = reviewArray.filter(r => r.userId === user.id)
  console.log(rev);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        history.push("/login");
        return;
      }
      const active = localStorage.getItem("active");
      if (active === "false") {
        history.push("/user/restore");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(`/api/back-end/users/perfil`, config);
        setUser(data);
      } catch (error) {
        console.log(error?.response.data.msg);
      }
    };
    autenticarUsuario();
  }, []);

  return (
    <div className="reCart">
      <h1 style={{fontStyle: "italic",color:"#fa42cc", textShadow: "0 0 3px #9027f1, 0 0 7px #9027f1, 0 0 12px, 0 0 18px #0066ff, 0 0 10px, 0 0 48px #8cf5ff75"}}>Tus Reseñas</h1>
        {rev?.length ? (
          rev.map((r) => {
            return (
              <div key={r.id} className="reCa">
                <div className="carti">
                  <div className="per">
                    <div className="peRe">
                      <DeleteReview id={r.id} location="user" meId={user.id}/>
                      <img src={user.userImg} alt="" />
                      <h4>{user.name}</h4>
                      <h5>{user.role}</h5>
                    </div>
                  </div>
                  <div className="rev">
                    {r.artist && (
                      <div className="revResource">
                        <p>Artista</p>
                        <Link to={`/artist/${r.artist.apiId}`}>
                          <p>{`${r.artist.name}`}</p>
                        </Link>
                      </div>
                    )}
                    {r.album && (
                      <div className="revResource">
                        <p>Álbum</p>
                        <Link to={`/album/${r.album.apiId}`}>
                          <p>{`${r.album.title}`}</p>
                        </Link>
                      </div>
                    )}
                    {r.song && (
                      <div className="revResource">
                        <p>Canción</p>
                        <Link to={`/song/${r.song.apiId}`}>
                          <p>{`${r.song.title}`}</p>
                        </Link>
                      </div>
                    )}
                    <div className="titulo">
                      <p>Titulo</p>
                      <p>{r.title}</p>
                    </div>
                    <div className="califica">
                      <p>Calificación: {r.score}</p>
                    </div>
                    <div className="descri">
                      <p>Descripcion:</p>
                      <p className="reviewDescription">{r.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={style.revDiv}>
            <h2>¡Aún no has creado ninguna reseña!</h2>
            <h3>Crea tu primer reseña y compartela con tus amigos</h3>
            <Link to="/search">Crea tu primer reseña y compartela con tus amigos</Link>
          </div>
        )}
    </div>
  );
};
