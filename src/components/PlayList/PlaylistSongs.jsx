import { Link } from "react-router-dom";
import style from "../../css/songs.module.css";
import PlaylistSongsCard from "./PlaylistSongsCard";

function PlaylistSongs(props) {
    console.log(props)
    if (props.songs.length !== 0) {
        return (
            <div className={style.songs}>
                {
                        props.songs && props.songs.map( (song, index) => {
                            let indexBase;
                            props.index !== undefined? indexBase = props.index : indexBase = 0 
                            return (
                                <PlaylistSongsCard
                                    key = {song.id}
                                    id = {song.id}
                                    apiId = {song.apiId}
                                    title = {song.title}
                                    duration = {(parseInt(song.duration) / 60).toFixed(2)}
                                    index = {indexBase+ index}
                                    image = {song.image}
                                    playlistId={props.playlistId}
                                    userId={props.userId}
                                />
                            )
                        })
                    }
                    <Link className={style.addSognsToList} to={"/search"} ><h3>Agrega canciones a tus playlist</h3></Link>
            </div>
        );
    }else{
        return (
            <div>
                <h2>No hay canciones</h2>
                <Link  className={style.addSognsToList} to={"/search"} ><h3>Agrega canciones a tus playlist</h3></Link>
            </div>
            
        )
    };
};

export default PlaylistSongs;