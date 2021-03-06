import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../screens/Home/reducer";
import newsLetterReducer from "../screens/Newsletter/reducer";
import calendarReducer from "../screens/Calendar/reducer";

export default combineReducers({
  form: formReducer,
  homeReducer,
  newsLetterReducer,
  calendarReducer
});
