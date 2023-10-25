import React, { useState} from "react";
import UseTimer from "../../utilities/timer";

import foodsInfomations from "../../json/foodsInformations.json"

import "./index.scss"

const Home = () => {
    const [ order, setOrder]  = useState([])
    const getOrderInformations = (name, time) => {
        const copyOrder = [...order]
        copyOrder.push({name:name, time:time})
        setOrder(copyOrder);    
    }

    return(
    <div className="content-main">
        <div className="header">
            <h1 className="p-4 text-center">Garçom Cronometrado</h1>
        </div>
        <div className="contant">
            <div className="foods mt-5">
                {
                    foodsInfomations.foods.map((el,i) => {
                        return (
                        <div key={i} className="food-box d-flex flex-column align-items-center ">
                            <h3 className="title-food">{el.name}</h3>
                            <p className="fixed-time">tempo: {el.time}:00</p>
                            <button className="button-food-box mb-4" onClick={() => getOrderInformations(el.name, el.time)}>Enviar</button>
                        </div>  
                        )
                    })
                }
            </div>
            <div className="post-foods mx-4">
                {order.map((el,id) => {
                    return(
                        <div key={id} className="teste mt-5">
                            <UseTimer initialMinutes={el.time} initialSeconds={0} food={el.name} id={id}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default Home