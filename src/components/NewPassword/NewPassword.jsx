import React, {  useState, useEffect } from 'react';
import { useParams , Link } from 'react-router-dom';
import Alerta from '../AlertaMensaje/Alerta';
import axios from 'axios';

const NewPassword = () => {
    const [ password , setPassword ] = useState("");
    const [ repitepassword , setRepitePassword] = useState("");
    const [ passwordConfirmada , setPasswordConfirmada] = useState(false);
    const [ tokenValido , setTokenValido] = useState(false);
    const [ alerta , setAlerta ] = useState({});

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const url = `/api/back-end/users/olvide-password/${token}`
                await axios( url )
                setAlerta({msg: "Coloca tu nueva contraseña", error: false})
                setTokenValido(true)
            } catch (error) {
                setAlerta({msg: error.response.data.msg, error: true})
            }
        };
        comprobarToken()
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password.length < 6){
            setAlerta({msg: "La contraseña debe ser minimo de 6 caracteres" , error: true})
            setTimeout(() => {
                setAlerta({})
            },2500)
            return
        };

        if(password !== repitepassword){
            setAlerta({msg: "Ambas contraseñas deben ser iguales", error: true})
            setTimeout(() => {
                setAlerta({})
            }, 2500)
            return
        };

        try {
            const url = `/api/back-end/users/olvide-password/${token}`
            const { data } = await axios.post( url , { password })
            setAlerta({msg: data.msg , error: false})
            setPasswordConfirmada(true)
        } catch (error) {
            setAlerta({msg: error.response.data.msg , error: true})
            setTimeout(()=>{
                setAlerta({})
              },2500)
        };
    };

    const { msg } = alerta;

  return (
    <>
     <div className="created">
        <div className="cre">

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && ( 

            <form onSubmit={handleSubmit} className="form">
            <h1>Reestablece tu contraseña</h1>
            <div>
                <br />
                <label>Nueva contraseña:</label>
                <br />
                <input 
                type="password" 
                className="field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingrese su nueva contraseña..."/>
            </div> 
            <div>
                <br />
                <label>Repita Nueva contraseña:</label>
                <br />
                <input 
                type="password" 
                className="field"
                value={repitepassword}
                onChange={e => setRepitePassword(e.target.value)}
                placeholder="Repita la nueva contraseña..."/>
            </div>
            <div className="crear">
              <br />
              <br />
                <input type="submit" class="btn btn-outline-success" value= "Recuperar "/>
            </div>
        </form>
        )}

        {passwordConfirmada && <Link to="/login">Inicia Sesión</Link>}

        </div>
    </div>
    </>
  );
};

export default NewPassword