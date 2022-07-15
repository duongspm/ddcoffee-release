export const actionType = {
    SET_USER: "SET_USER",
    SET_DRINK_ITEMS : "SET_DRINK_ITEMS"
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_DRINK_ITEMS:
            return {
                ...state,
                drinkItems: action.drinkItems,
            }; 
        default:
            return state;
    }
};

export default reducer;