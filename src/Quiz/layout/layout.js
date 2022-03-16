import React from "react";
import video from './border_template.mp4';

const Layout = (props) => {
    return (
        <div>
            <video className='videoBackground' autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            {props.children}
        </div>
    )
}
export default Layout;