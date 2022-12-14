import Modal from "../Modal/Modal";
import { useModal } from "../Modal/useModal";
import CreatePlaylist from "./CreatePlaylist";
import UserPlaylist from "./UserPlaylists";

export default function AddTrack({userId, trackId, name}) {
     const [isOpen, openModal, closeModal] = useModal(false);
    return (
        <div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                { trackId ?
                    <UserPlaylist
                    id={trackId}
                    closeModal={closeModal}
                    name={name}  
                    userId={userId}              
                    isModal={true}
                    /> : <></>
                }
                <CreatePlaylist
                onClose={closeModal}
                userId={userId}
                />
            </Modal>
            <button className="addplaylist" onClick={openModal}>+/- Playlist</button>
        </div>
    )
}