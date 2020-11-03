import { Update } from "@material-ui/icons";
import initialState from "./initialState.json";
import update from 'immutability-helper';
export default function rootReducer(state = initialState, action) {
    console.log(state);

    switch (action.type) {
        case "ADD_CONTACT": return { ...state, contactSection: action.contactSection }
        case "ADD_EDUCATION": return { ...state, educationSection: action.educationSection }
        case "SET_SKIN": return  update(state,{document:{skinCd:{$set:action.skinCd}}});
        default: return state;
    }
}