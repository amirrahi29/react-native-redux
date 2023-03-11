export const ADD_CART = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

export const REMOVE_CART = (item) => {
    return {
        type: "REMOVE_CART",
        payload: item
    }
}