import React, { useState,useEffect } from "react";
import UseTimer from "../../utilities/timer";

import foodsInfomations from "../../json/foodsInformations.json"

import NewFoodInput from "../../components/inputNewFood";

import "./index.scss"


const Home = () => {
    const [order, setOrder] = useState([])
    const [data, setData] = useState([]);
    const [dataMap, setDataMap] = useState(new Map());
    const getOrderInformations = (name, time) => {
        const copyOrder = [...order]
        const foodObj = { name: name, time: time }
        copyOrder.push(foodObj)
        setOrder(copyOrder);
    }
    useEffect(() => {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('list-foods'))
    
        if (dataFromLocalStorage && Array.isArray(dataFromLocalStorage)) {
          let id = 0
          const map = new Map();
          dataFromLocalStorage.forEach(item => {
            map.set(id, item);
            id += 1
          });
    
          setData(dataFromLocalStorage);
          setDataMap(map);
        }
    }, []);

    const handleDelete = (id) => {
        console.log(id);
        console.log(id);
        const updatedData = data.filter(item => item.id !== id);
    
        setData(updatedData);
        setDataMap(new Map(updatedData.map(item => [item.id, item])));
        localStorage.setItem('list-foods', JSON.stringify(updatedData));
      };

    return (
        <div className="content-main">
            <div className="header">
                <h1 className="p-4 text-center">Garçom Cronometrado</h1>
            </div>
            <div className="contant">
                <div className="foods mt-5">
                    {
                        foodsInfomations.foods.map((el, i) => {
                            return (
                                <div key={i} className="food-box d-flex flex-column align-items-center ">
                                    <h3 className="title-food">{el.name}</h3>
                                    <p className="fixed-time">tempo: {el.time}:00</p>
                                    <button className="btn btn-success mb-4" onClick={() => getOrderInformations(el.name, el.time)}>Enviar</button>
                                </div>
                            )
                        })
                    }
                    {Array.from(dataMap.values()).map((el, id) => {
                        return (
                            <div key={id} className="food-box d-flex flex-column align-items-center ">
                                <h3 className="title-food">{el.name}</h3>
                                <p className="fixed-time">tempo: {el.time}:00</p>
                                <div className="mb-4">
                                    <button className="btn btn-success me-3" onClick={() => getOrderInformations(el.name, el.time)}>Enviar</button>
                                    <button type="button" class="btn btn-danger" onClick={() => handleDelete(id) }>Excluir</button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <NewFoodInput />
                <div className="post-foods mx-4">
                    {order.map((el, id) => {
                        console.log(el.id);
                        return (
                            <div key={id} className="teste mt-5">
                                <UseTimer initialMinutes={el.time} initialSeconds={0} food={el.name} id={el.id} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home