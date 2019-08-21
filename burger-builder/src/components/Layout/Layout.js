import React from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children} {/*use the layout component as a wrapper for the actual content*/}
        </main>
    </Aux>
);

export default layout;