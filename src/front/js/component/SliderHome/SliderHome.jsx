import React, { useContext, useEffect } from "react";
import styles from "./sliderhome.module.css";
import img1 from "../../../assets/1.jpg";
import img2 from "../../../assets/2.jpg";
import img3 from "../../../assets/3.jpg";
import img4 from "../../../assets/5.jpg";

export const SliderHome = () => {
    return (
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
            <div className="carousel-inner">
                <div className={`${styles.carousel_item} carousel-item active`}>
                    <img src={img1} className={`d-block w-40 ${styles.carousel_image}`} alt="..." />
                </div>
                <div className={`${styles.carousel_item} carousel-item`}>
                    <img src={img2} className={`d-block w-40 ${styles.carousel_image}`} alt="..." />
                </div>
                <div className={`${styles.carousel_item} carousel-item`}>
                    <img src={img3} className={`d-block w-40 ${styles.carousel_image}`} alt="..." />
                </div>
                <div className={`${styles.carousel_item} carousel-item`}>
                    <img src={img4} className={`d-block w-40 ${styles.carousel_image}`} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
    
    
}