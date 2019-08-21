import React, { PureComponent } from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass'; //doesn't qualify as a component (it doesn't return JSX)
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  //lifecycle hooks
  constructor(props) {
    super(props)  //everywhere else it has to be this.props
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        {id:'asfa1',name:'J.D.',age:28}, 
        {id:'vasdf1',name:'Clark',age:20},
        {id:'asdf11',name:'Adam',age:17}
      ],
      otherState: 'some other values',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }
  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //   nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState) { //new lifecycle hook
    // your state should rarely be coupled to your props
    console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate() { // executes right before componentDidUpdate
    // useful for saving the current scrolling position of your user
    console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate()');
  }

  componentDidUpdate() { //no passing nextProps and nextState because it's after the update
    console.log('[UPDATE App.js] Inside componentDidUpdate()');
  }

  // state = { //preferred way of declaring state (outside constructor)
  //   persons: [
  //     {id:'asfa1',name:'J.D.',age:23}, 
  //     {id:'vasdf1',name:'Clark',age:20},
  //     {id:'asdf11',name:'Adam',age:17}
  //   ],
  //   otherState: 'some other values',
  //   showPersons: false
  // }

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    }) //this is a default js method which gives us the person

    const person = {
      ...this.state.persons[personIndex] //js objects are reference types - don't mutate them directly
      //use spread operator to create the copy that you can mutate 
    };

    //below is the old fashioned approach to above
    //const person = Object.assign({}, this.state.persons[personIndex]) //empty object is first argument

    person.name = event.target.value; 
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons:persons})
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); //copies the full array with slice()
    const persons = [...this.state.persons]; //spread operator //equivalent to above
    persons.splice(personIndex, 1); //removes 1 element from array
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons; //either true or false - it's that boolean value
    this.setState((prevState, props) => { //best way of mutating state if dependent on previous states
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    }); //set state is asynchronous, using it as an arrow function improves it
  }

  loginHandler = () => {
    this.setState({authenticated:true});
  }

  render() {
    console.log('[App.js] Inside render()')
    let persons = null; //the default
    if(this.state.showPersons) {
      persons = <Persons 
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}/>;  
    }

    return (
      <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            login={this.loginHandler}
            clicked={this.togglePersonsHandler}/>
            <AuthContext.Provider value={this.state.authenticated}>
              {persons}
            </AuthContext.Provider>
          </Aux>  
    );
    //return React.createElement('div',null,React.createElement('h1',{className: 'App'},'Does this work now?'));
  };
}
export default withClass(App, styles.App);