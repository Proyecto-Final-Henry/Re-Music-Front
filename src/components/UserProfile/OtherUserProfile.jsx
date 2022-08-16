//import {useSelector} from 'react-redux'; // descomentar cuando este llegando la data
import { useEffect, useState } from "react";
import axios from "axios"
import { useHistory, useParams } from "react-router-dom";
import "../../css/users.css";
import ChangeProfileImg from "../ChangeProfileImg/ChangeProfileImg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOtherUser } from '../../redux/actions/index';
import Follow from "../Follow/Follow";




export default function UserProfile() {
    //const data =useSelector(store => store.userData) // descomentar para subcribir el componete al stado global con la data que se pide por params
    const user = useSelector(state => state.otherUser)
  const history = useHistory();

  const dispatch = useDispatch()

  const [meUser, setMeUser] = useState({})

  const {id} = useParams()

  useEffect(() => {
    const autenticarUsuario = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          history.push("/login");
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
          setMeUser(data);
        } catch (error) {
          console.log(error.response.data.msg);
        }
      };
      autenticarUsuario();
    dispatch(getOtherUser(id))
  }, [dispatch]);


      
      return (
          <div className="detailBac">
              <div className="detail">
        <div className="carta">
            <div>
              <img src={user?.userImg} alt="userImg"></img>
              <br />
              <br />
            </div>
          <h3 className="userP">{user?.name}</h3>
          <p className="userP">{user?.email}</p>
          <p className="userP">Miembro desde {user?.createdDate}</p>
          <p className="userP">Usuario {user?.role}</p>
          <p >Seguidores: {user?.followers?.length}</p>
          <p >Seguidos: {user?.following?.length}</p>
        <Follow followers={user.followers} followings={user.followings} id={user.userId ? user.userId : user.id} meId={meUser.id} />
        </div>
      </div>
    </div>
  );
}