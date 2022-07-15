const Reducer = (state, action) => {
    switch (action.type) {
    case "LOG_IN":
        return {
          ...state,
          user: action.payload,
        };
    case "LOG_OUT":
      return {
          ...state,
         user: null,
        }
    default:
        return state;
    }
  };
  
  export default Reducer;