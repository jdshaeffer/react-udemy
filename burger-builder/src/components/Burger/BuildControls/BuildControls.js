import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)} // passing type here because we need it for add_ingredient_handler    
                // also, ^^^ needs to be a function since the props we're calling is a function
                removed={() => props.ingredientRemoved(control.type)} 
                disabled={props.disabled[control.type]} /> 
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable}>Order Now</button>
    </div>
);

export default buildControls;