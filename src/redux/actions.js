import * as actions from "./actionTypes";


export const addCustomers = (customers) => ({
    type: actions.INITIALIZE_CUSTOMERS,
    payload:{customers}
})


export const addCustomer = (customer) => ({
    type: actions.ADD_CUSTOMER,
    payload:{customer}
})

export const updateCustomer = (customer,updated) => ({
    type: actions.UPDATE_CUSTOMER,
    payload:{
        customer
    },
    data:updated
})

export const deleteCustomer = id => ({
    type: actions.REMOVE_CUSTOMER,
    payload:{
        id
    }
})