import { CART_CLEAR, CART_ADD_ITEM ,CART_REMOVE_ITEM, CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_DETAILS_FAIL,} from "../constants/cartConstants";


    export const cartReducer = (state = { cartItems: [], loading: false, error: null }, action) => {
        switch(action.type){
            case CART_ADD_ITEM:
                const item = action.payload;
                const existItem = state.cartItems.find(x => x.product === item.product);
                if(existItem){
                    return {
                        ...state, 
                        cartItems: state.cartItems.map(x =>
                            x.product === existItem.product ? item : x)                    
                    };
                }else{
                    return {
                        ...state, 
                        cartItems: [...state.cartItems, item]
                    };
                }
    
            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                };
    
            case CART_DETAILS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: null // Clear any errors when we start a new request
                };
            // setting cartItems fields and values
            case CART_DETAILS_SUCCESS:
                return {
                    ...state,
                    cartItems: action.payload.items.map(item => ({
                      product: item.product.id,
                      name: item.product.title,
                      images: item.product.images, // Assuming you have an image URL or path here
                      stripe_id: item.product.stripe_id,
                      total_price: item.total_price,
                      unit_price: item.product.unit_price,
                      qty: item.quantity,
                      countInStock: item.product.inventory, // Assuming you have inventory info
                    })),
                    // Update total price if needed, or any other state properties
                };
    
            case CART_DETAILS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };

            case CART_CLEAR:
                return {
                    ...state,
                    cartItems: [] // Reset cartItems to an empty array
                };
    
            default:
                return state;
        }
    };