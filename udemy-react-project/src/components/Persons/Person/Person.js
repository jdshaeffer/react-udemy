import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './Person.module.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import {AuthContext} from '../../../containers/App'

//a component is a function returning some jsx (stateless)
//becoming stateful here:
class Person extends Component {
    constructor(props) {
		super(props)  //everywhere else it has to be this.props
        console.log('[Person.js] Inside Constructor', props);
        this.inputElement = React.createRef(); // creates a reference

	}
	componentWillMount() {
		console.log('[Person.js] Inside componentWillMount()');
	}
	componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()')
        // this.focusInput();
    }

    focus() {
        this.inputElement.current.focus();
    }
        
    render() {
        console.log('[Person.js] Inside render()')
        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated!</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement} // references are only available in stateful components
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </Aux>
        )
    }
}

Person.propTypes = { //this won't work in functional componenents
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, styles.Person);

// const random = Math.random();
// if(random > .7) {
//     throw new Error('Something went wrong my dood sorry to tell yers');
// }