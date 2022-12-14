import { useEffect } from "react";
import ControlledCarousel from "./Carousel";
import Info from "./Info";
// import Socket from "../Socket/Socket";

function Home() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("active");
  },[]);

    return (
      <div>
        <div className="Caro">
          <ControlledCarousel/>
        </div>
        <div className="info">
          <Info/>
        </div>
        {/* <div className="footer-l">
          <Socket/>
        </div> */}
      </div>
    );
  };

export default Home;