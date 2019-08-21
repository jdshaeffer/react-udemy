import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => { // {} because we want to implement some js logic
    // for dynamic ingredient choosing - giving us an array of the keys
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => { // Object and Array are js
        return [...Array(props.ingredients[igKey])].map((_, i) => { // index i is important, but we don't care about the element itself here (hence the _)
            return <BurgerIngredient key={igKey + i} type={igKey} />; // create a unique key for each ingredient
        });
    }).reduce((arr, el) => { // transforms an array into something else. arr = previous value, el = current value
        return arr.concat(el) // take the element we're looping and put it in the array - this makes the array empty if no jsx is inside
    }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Start adding ingredients!</p>;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div> 
    );
}

export default burger;