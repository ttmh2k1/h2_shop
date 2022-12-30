const initState = {
  showModal: false,
};

const displayReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_SHOW_MODAL':
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};

export default displayReducer;
