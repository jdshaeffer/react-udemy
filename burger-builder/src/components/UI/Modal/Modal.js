// no state attached to it - going to be a functional comp - just receives props and returns JSX
import React from 'react';
import classes from '*.module.css';

const modal = (props) => (
    // a div wrapped around props.children
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;