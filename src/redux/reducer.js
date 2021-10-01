import * as actions  from './actionTypes';
import { combineReducers } from 'redux';

let lastId = 0;
let dataState = { customers: [] };
// export default function reducer(state = dataState, action){
    
//     switch(action.type){
//         case actions.INITIALIZE_CUSTOMERS:
//             let { customers } = action.payload;
//             return {...state, customers};
//         case actions.ADD_CUSTOMER:
//             return [...state,{
//                 id: lastId++,
//                 firstName:action.payload.firstName,
//                 lastName:action.payload.lastName,
//                 dob:action.payload.dob,
//                 phone:action.payload.phone,
//                 address:action.payload.address
//             }];
//         case actions.UPDATE_CUSTOMER:
//             state.map(customer => {
//                 if(customer.id !== action.payload.id){console.log(customer)}
//             })
//             return state.map(customer => customer.id !== action.payload.id ? 
//                 customer 
//                 : 
//                 {...customer, 
//                     firstName:action.data.firstName,
//                     lastName:action.data.lastName,
//                     dob:action.data.dob,
//                     phone:action.data.phone,
//                     address:action.data.address
//                 });
//         case actions.REMOVE_CUSTOMER:
//             return state.filter(customer => customer.id !== action.payload.id);
//         default:
//             return state;
//     }
// }


const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case actions.ADD_CUSTOMER:
            let { customer } = action.payload;
            console.log("add customer");
            console.log(customer);
            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));

            clone.unshift(customer); //add the new customer to the top
            return {...state, customers: clone};

        case actions.INITIALIZE_CUSTOMERS:
            let { customers } = action.payload;
            console.log("state");
            console.log(state);
            state = {...state, customers}
            console.log("final state");
            console.log(state);
            return state;//, customers};

        case actions.UPDATE_CUSTOMER:{
            let { customer } = action.payload;

            //clone the current state
            let clone = JSON.parse(JSON.stringify(state.customers));
            console.log(clone);

            //check if bookmark already exist
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

// Combine all the reducers
const rootReducer = combineReducers({dataReducer});

export default rootReducer;