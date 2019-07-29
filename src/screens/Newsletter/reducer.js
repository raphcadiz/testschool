const initialState = {
  post_selected: {}
};
export default function(state: any = initialState, action: Function) {
  switch (action.type) {
    case "SELECT_POST":
      return { ...state, post_selected: action.post_selected };
    default:
      return state;
  }
}
