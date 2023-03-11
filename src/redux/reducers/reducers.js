const INIT_STATE = {
    carts: []
}

export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state.carts,
                carts: [...state.carts, action.payload]
            }
        case "REMOVE_CART":
            const data = state.carts.filter((element) => element.id !== action.payload.id);
            return {
                ...state.carts,
                carts: data
            }
        default:
            return state;
    }
}