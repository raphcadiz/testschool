export function selectPost(post_selected: Object) {
  return {
    type: "SELECT_POST",
    post_selected
  };
}
