import * as actions from "./actionTypes";


export const addCustomers = (customers) => ({
    type: actions.INITIALIZE_CUSTOMERS,
    payload:{customers}
})


export const addCustomer = customer => ({
    type: actions.ADD_CUSTOMER,
    customer
})

export const updateCustomer = (customer) => ({
    type: actions.UPDATE_CUSTOMER,
    payload:{
        _customer:customer
    }
})

export const deleteCustomer = id => ({
    type: actions.REMOVE_CUSTOMER,
    payload:{
        id
    }
})