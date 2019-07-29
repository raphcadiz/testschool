const initialState = {
  event_selected: {}
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "SELECT_EVENT":
      return { ...state, event_selected: action.event_selected };
    default:
      return state;
  }
}
