import { attributeConstants } from "../actions/constants";

const initialState = {
    attributes: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case attributeConstants.GET_ALL_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attributes: action.payload.attributes
            }
            break;
    }

    return state;
}
