import React, {useEffect} from "react";
  export const HomeContent = (props) => {
    console.log("homecontent");  
    return (
        <div id="HomeContent-div" style={{backgroundColor: "#DED0B6"}}>
            <p></p>
            <p><strong>" 歡迎來到圖書系統 "</strong></p>
            <img
                    src="/img/home_banner.jpg"
                    width="100%"
                    height="60%"
                    alt="React Bootstrap logo"
            />
        </div>
    );
  }