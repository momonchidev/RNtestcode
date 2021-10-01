import * as actions  from './actionTypes';

let initialState = [];

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_CUSTOMER:
            let { customer } = action;
            return [
                ...state, 
                {
                    customer
                }
            ]
        case actions.INITIALIZE_CUSTOMERS:
            let { customers } = action.payload;
            return [...state, customers];

        case actions.UPDATE_CUSTOMER:{
            let { customer } = action.payload;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            //check if customer already exist
            const index = clone.findIndex((obj) => obj != null && obj.id === customer.id);

            //if the customer is in the array, update the customer
            if (index !== -1) clone[index] = customer;

            return {...state, customers: clone};
        }

        case actions.REMOVE_CUSTOMER:{
            let { id } = action.payload;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            //check if customer already exist
            const index = clone.findIndex((obj) => obj != null && obj.id === id);

            //if the customer is in the array, remove the customer
            if (index !== -1) clone.splice(index, 1);

            return {...state, customers: clone};
        }

        default:
            return state;
    }
};

export default customerReducer;