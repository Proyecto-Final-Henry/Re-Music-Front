import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ArtistCard from "../SearchResultCards/ArtistCard";
import AlbumCard from "../SearchResultCards/AlbumCard";
import TrackCard from "../SearchResultCards/TrackCard";
import Filters from "./Filters";
import Pagination from "./Pagination";
import PaginationFilter from "./PaginationFilter";
import SearchBar from "../Search/SearchBar";
import { getSearch, calcPages, onPageChanged, getPlaylist, clearArtist, clearAlbum, clearSong } from "../../redux/actions";
import style from '../../css/searchbar.module.css'
import { pageLimit } from "./PaginationFilter";
import UserCard from "../SearchResultCards/UserCard";
import axios from "axios"


export default function SearchResult() {
  const pagination = useSelector((store) => store.pagination);
  const query = useSelector((store) => store.query);
  const filter = useSelector((store) => store.filter);
  const index = useSelector((store) => store.index);
  const searchResult = useSelector((store) => store.searchResult);
  const currentResult = useSelector((store) => store.currentResult);
  const selected = useSelector((store) => store.selected);
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name:'',
    id:'',
  });

  useEffect(() => {
    const autenticarUsuario = async () => {
        const token = localStorage.getItem("token")
        if(!token){
            history.push("/login")
            return
        }
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      };
      try {
          const { data } = await axios(
              `/api/back-end/users/perfil`,
              config
          );
          setUser(data);
          
      } catch (error) {
          console.log(error.response.data.msg);
      };
    };
    autenticarUsuario()
    dispatch(clearArtist());
    dispatch(clearAlbum());
    dispatch(clearSong());
  },[]);
   
  useEffect(() => {
    dispatch(getPlaylist(user.id));
  },[user.id,]);



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
    };
    autenticarUsuario();
  }, []);
  useEffect(() => {
    dispatch(calcPages(pageLimit));
    const paginationData = {
      currentPage: 1,
      pageLimit: pageLimit,
    };
    dispatch(onPageChanged(paginationData));
  }, [searchResult]);

  let data = [];
  let render = [];
  if (selected) {
    data = currentResult;
    render.push({ selected: true });
  } else {
    data = searchResult;
    render.push({
      pagination: pagination,
      query: query,
      filter: filter,
      index: index,
      onMove: getSearch,
      selected: false,
    });
  }
  return (
    <div className={style.main_div}>
      <div>
        <SearchBar onSearch={getSearch} />
      </div>
      <div>
        <Filters />
      </div>
      <div className={style.data}>
        {data.map((e, i) => {
          if (e.type === "artist") {
            return (
              <ArtistCard
                key={i}
                id={e.id}
                name={e.name}
                img={e.img}
                type={e.type}
              />
            );
          } else if (e.type === "album") {
            return (
              <AlbumCard
                key={i}
                id={e.id}
                title={e.title}
                img={e.img}
                artist={e.artist}
                artistId={e.artistId}
                type={e.type}
              />
            );
          } else if (e.type === "track") {
            return (
              <TrackCard
                key={i}
                id={e.id}
                title={e.title}
                img={e.img}
                artistId={e.artistId}
                artist={e.artist}
                album={e.album}
                albumId={e.albumId}
                type={e.type}
                userId={user.id}
              />
            );
          } else if (e.type === "user") {
            return <UserCard key={i} id={e.id} name={e.name} img={e.userImg} />;
          } else
            return (
              <p key={i}>
                otro typo de dato esto es un error y no debe renderizarse hay,
                data que estamos ignorando
              </p>
            );
        })}
      </div>
      <div>
        {render.map((e, i) => {
          if (e.selected) {
            return <PaginationFilter key={i} />;
          } else {
            return (
              <Pagination
                key={i}
                pagination={pagination}
                query={query}
                filter={filter}
                index={index}
                onMove={getSearch}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
