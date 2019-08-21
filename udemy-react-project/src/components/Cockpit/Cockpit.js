import React from 'react';
import styles from './Cockpit.module.css'
import Aux from '../../hoc/Aux'

const cockpit = (props) => {
	const classes = [] //turn array of strings into 1 string "red bold"
	let buttonClass = styles.Button;
	if(props.showPersons) {
		buttonClass = [styles.Button, styles.Red].join(' ');
	}

	if(props.persons.length <= 2) { //if 2 or less people left
		classes.push(styles.red); //classes = ['red']
	}
	if(props.persons.length <= 1) {
		classes.push(styles.bold); //classes = ['red,'bold']
	}
		
	return (
		<Aux>
			<h1>{props.appTitle}</h1>
			<p className={classes.join(' ')}>This is really working!</p>
			<button
				className={buttonClass}
				onClick={props.clicked}>Toggle Persons
			</button>
			<button onClick={props.login}>Log in</button>
		</Aux>
	);
};

export default React.memo(cockpit);