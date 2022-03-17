import React from "react";
import video from '../layout/video.mp4';

const Layout = (props) => {
  return (
    <div className="layout">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      {props.children}
    </div>
  );
};
export default Layout;
