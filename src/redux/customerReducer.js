import * as actions  from './actionTypes';

let initialState = [];

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_CUSTOMER:
            let { customer } = action;
            let isExist = false;
            //check id if existing
            state.map(cus => {
                if(cus.customer.id === customer.id){
                    isExist = true;
                }
            })
            if(isExist){
                return state;
            }
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
            let { _customer } = action.payload;
            return state.map(cus => {
                if(cus.customer.id === _customer.id){
                    let {customer} = cus;
                    let updatedObj = {...customer,
                        firstName:_customer.firstName,
                        lastName:_customer.lastName,
                        dob:_customer.dob,
                        phone:_customer.phone,
                        email:_customer.email,
                        address:_customer.address
                        };
                    return {...cus,customer:updatedObj}
                }
                return cus;
            })
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