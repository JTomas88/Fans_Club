import React from "react";
import { Jumbotron } from "../../component/Jumbotron/Jumbotron";
import { SliderHome } from "../../component/SliderHome/SliderHome";
import { Videos } from "../../component/Videos/Videos";
import img from "../../../assets/fronteyes.png"


export const Home = () => {

    return (
        <div className="bg-color mb-3">
            <div>
                <Jumbotron imagenFondo={{ backgroundImage: `url(${img})`, backgroundPosition: 'center 10%' }} subtitulo={"Ya no se me para el tiempo"} referencia={'home'} ></Jumbotron>
            </div>
            <div className="mt-3">
                <SliderHome />
            </div>
            <div>
                <Videos/>
            </div>

        </div>
    )
}

