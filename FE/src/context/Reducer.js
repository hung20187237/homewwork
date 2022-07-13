const Reducer = (state, action) => {
    switch (action.type) {
    case "LOG_IN":
        return {
          user: action.payload,
        };
    case "LOG_OUT":
      return {
         user: null,
        }
    default:
        return state;
    }
  };
  
  export default Reducer;