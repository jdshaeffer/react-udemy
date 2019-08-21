// it's a container because here we'll be managing the state
import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'

const INGREDIENT_PRICES = { // typically name global constants in all caps
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7
}
    
class BurgerBuilder extends Component {  
    state = {
        ingredients: { // ...this.state.ingredients copies this in an unmutable way
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4, // base price
        purchasable: false
    }

    update_purchase_state = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => { // creates an array of string entries ('salad', etc.)
            return ingredients[key]; // accessing a certain property in the object
            // now we have an array of values
        }).reduce((sum, element) => {  // return the sum of all ingredients
            return sum + element;  
        },0);
        this.setState({purchasable: sum > 0}) // purchaseable if sum > 0
    }

    add_ingredient_handler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients // distribute the properties of the old ingredient state into updatedIngredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.update_purchase_state(updatedIngredients);
    }

    remove_ingredient_handler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) {
            return;
        }
        else {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
            this.update_purchase_state(updatedIngredients);
        }
    }
    
    render() {
        const disabledInfo = {
            ...this.state.ingredients 
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        return (
            <Modal/>
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice} // this.state because it's in the state!!
                    ingredientAdded={this.add_ingredient_handler}
                    ingredientRemoved={this.remove_ingredient_handler}
                    purchaseable={this.state.purchasable}
                    disabled={disabledInfo}/> {/* Not this.disabledInfo - this doesn't belong to a state - it's a local variable */}
            </Aux>
        ); 
    }
}

export default BurgerBuilder;