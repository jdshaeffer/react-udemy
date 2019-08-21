import React, {PureComponent} from 'react';
import Person from './Person/Person'
//becoming stateful
class Persons extends PureComponent {
	//lifecycle hooks
	constructor(props) {
		super(props)  //everywhere else it has to be this.props
		console.log('[Persons.js] Inside Constructor', props);
		this.lastPersonRef = React.createRef();
	}
	componentWillMount() {
		console.log('[Persons.js] Inside componentWillMount()');
	}
	componentDidMount() {
		console.log('[UPDATE Persons.js] Inside componentDidMount()')
		this.lastPersonRef.current.focus();
	}

		// shouldComponentUpdate(nextProps, nextState) {
		// 	console.log('[UPDATE Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
		// 	return nextProps.persons !== this.props.persons || 
		// 	nextProps.changed !== this.props.changed ||
		// 	nextProps.clicked !== this.props.clicked; //false stops the whole process (use it if no update is required)
		// } //don't need this if we're doing just this shallow check
		// don't need this because we have PureComponent!!!

		componentWillUpdate(nextProps, nextState) {
			console.log('[UPDATE Persons.js] Inside componentWillUpdate()', nextProps, nextState);
		}

		componentDidUpdate() { //no passing nextProps and nextState because it's after the update
			console.log('[UPDATE Persons.js] Inside componentDidUpdate()');
		}
		
	render() {
		console.log('[Persons.js] Inside render()')
		return this.props.persons.map((person, index) => {
			return <Person 
				position={index}
				ref={this.lastPersonRef}
				name={person.name} 
				age={person.age} 
				click={() => this.props.clicked(index)}
				key={person.id}
				changed={(event) => this.props.changed(event,person.id)}/>
		});
	}
}

export default Persons;