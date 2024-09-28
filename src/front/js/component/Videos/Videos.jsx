import React, { useContext, useEffect } from "react";
import styles from "./videos.module.css"

export const Videos = () => {
    return(
        <div className="container mt-5">
            <div className={`${styles.tranceVideos} justify-content-center align-items-center d-flex`} >
                TRANCE VIDEOS
            </div>
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/0qEnQmvJ_nY?si=TIC5jR2Y1AcAbOag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        </div>
    )
}