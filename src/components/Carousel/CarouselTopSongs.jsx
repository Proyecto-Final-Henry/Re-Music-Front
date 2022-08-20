import style from "../../css/premium.module.css";
import ArtistCard from "../Music/ArtistCard";
import MusicCard from "../Music/MusicCard";

function CarouselTopSongs({title, data, info}) {

    const fila = document.querySelector('.carouselTopSongs');
    const next = () => fila.scrollLeft += fila.offsetWidth;
    const prev = () => fila.scrollLeft -= fila.offsetWidth;

    return (
        <div className={style.contenedor}>
            <div className={style.contenedor_titulo_controles}>
            <h3>{title}</h3>              
            </div>

            <div className={style.contenedor_principal}>
            <button role={'button'} onClick={prev} className={style.flecha_izquierda}><i className="fa-solid fa-circle-chevron-left"></i></button>
            <div className={`${style.contenedor_carousel} carouselTopSongs`}>
                <div className={style.carousel}>
                    {data.map((song) => {
                        return (
                            <div className={`${style.card}`} key={song.id}>
                                <MusicCard
                                    key={song.id}
                                    id={song.id}
                                    title={song.title}
                                    album={song.album}
                                    albumId={song.albumId}
                                    artist={song.artist?.name}
                                    artistId={song.artist?.id}
                                    img={song.artist?.image}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <button role={'button'} onClick={next} className={style.flecha_derecha}><i className="fa-solid fa-circle-chevron-right"></i></button>
            </div>
        </div>
    );
}

export default CarouselTopSongs;