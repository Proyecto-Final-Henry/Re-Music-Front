import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../css/users.css";
import Spinner from "react-bootstrap/Spinner";

export default function UserProfile() {
  //const data =useSelector(store => store.userData) // descomentar para subcribir el componete al stado global con la data que se pide por params
  const history = useHistory();
  const [user, setUser] = useState({});

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
        console.log(error.response.data.msg);
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("active");
    history.push("/");
  };

  return (
    <div className="to">
      <div className="fe">
        <div className="car">
          <Link to="/user" style={{ textDecoration: "none" }}>
            {user.userImg ?  (
              <div className="pri">
                <img src={user?.userImg} alt="userImg"></img>
                <h3>{user?.name}</h3>
                <p>Desde {user?.createdDate}</p>
                <p>Usuario {user.role}</p>
                <hr />
                { user.role==="Gratuito"?(
                  <div className="bo">
                    <p>Hazte Con Todos Los Beneficios</p>
                    <Link to="/premium2">PRUEBA PREMIUM AHORA</Link>
                  </div>
                ):(
                <div>
                  <p style={{textShadow: "0 0 5px #9027f1, 0 0 15px #9027f1, 0 0 20px #9027f1, 0 0 40px #9027f1, 0 0 60px #0066ff, 0 0 10px #177eed, 0 0 98px #8cf5ff75"}}>Ya eres premium</p>
                </div>
                )}
              </div>
            ) : (
              <div className="spi">
                <Spinner animation="border" variant="light" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
