import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';
/*
You'll also need to transform a string into a real array and then join it back into
  a string again to complete task 5 of the assignment.
You can split a string into an array of its characters with the split('')  method.
By passing just an empty string, it's split after every character.
You may then re-create a string from that array by using join('')
  - again, joining with an empty string as a separator.
*/
class App extends Component {
  state = {
    text: ""
  }
  textLengthListener = (event) => {
    this.setState({text: event.target.value});
  }

  deleteCharHandler = (index) => {
    const charList = this.state.text.split('')
    charList.splice(index, 1); //removes 1 element from array
    const updatedCharList = charList.join('') //bring the array back together
    this.setState({text: updatedCharList}); //update the state to display only the remaining chars
  }

  render() {
    const charList = this.state.text.split('').map((char,index) => { //need split('') to turn the string into an array
      return <Char character={char} key={index} click={() => this.deleteCharHandler(index)}/>;
    });

    return (
      <div className="App">
        <ol>
          <li>DONE Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>DONE Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>DONE Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>DONE Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>DONE Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>DONE When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <br/>
        <input type="text" onChange={this.textLengthListener} value={this.state.text}/> {/*two way binding*/}
        <p>{this.state.text}</p>
        <Validation length={this.state.text.length}/>
        {charList}
      </div>
    );
  }
}

export default App;
