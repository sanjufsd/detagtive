import { users } from "../../../src/containers/Account/AllProfile/components/data.js";
import {
  ADD_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  SELECTED_PROF
} from "../actions/profileActions";

const initialState = users;
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PROFILE:
      return [...state, action.payload];
    case DELETE_PROFILE:
      return state.filter(x => x.id !== action.payload["id"]);
    case UPDATE_PROFILE:
      return state.map(profile => {
        const { id } = action.payload;
        if (profile.id === id) {
          profile["Name"] = action.payload["Name"];
          profile["Client"] = action.payload["Client"];
          profile["Email"] = action.payload["Email"];
          profile["Language"] = action.payload["Language"];
          profile["Surname"] = action.payload["Surname"];
          profile["Timezone"] = action.payload["Timezone"];
          profile["Title"] = action.payload["Title"];
          profile["Department"] = action.payload["Department"];
        }
        return profile;
      });
      case SELECTED_PROF:
          return state.map(profile => {
            const { id, name, email, company } = action.payload;
            if (profile.id === id) {
              profile.name = name;
              profile.grade = email;
              profile.company.name = company.name;
            }
            return profile;
          });
    default:
      return state;
  }
}
