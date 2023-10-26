import React from "react";

import "./index.scss";

const NewFoodInput = () => {

    const PutFoodsLocalStorage = () => {
        const name = document.getElementsByName('name')[0];
        const time = document.getElementsByName('time')[0];

        const listFoods = JSON.parse(localStorage.getItem('list-foods') || '[]');
        const foodObj = {name:name.value, time:time.value}
        listFoods.push(foodObj)
        localStorage.setItem("list-foods", JSON.stringify(listFoods));
    };

    return(
        <div>
            <form>
                <div className="container-new-food d-flex flex-column align-items-center">
                    <h2>Catalogar nova porção</h2>
                    <div>
                        <label for="name" className="mt-3">Nome da comida:</label><br/>
                        <input type="text" className="new-food-input" name="name" placeholder="Nome da porção"/>
                    </div>
                    <div>
                        <label for="time" className="mt-3">Tempo de Preparo:</label><br/>
                        <input type="text" className="new-food-input mb-3" placeholder="Tempo de preparo" name="time"/>
                    </div>
                    <button onClick={() => PutFoodsLocalStorage()} type="button" className="btn btn-primary">Adicionar</button>
                </div>
            </form>
        </div>
    );
};

export default NewFoodInput;