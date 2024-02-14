const initialState = {
    data: [],
    food: [],
  };
  
  export const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADDCARTDATA":
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      case "DELCARTDATA":
        const updatedData = state?.data?.filter((item) => item?.id !== action.payload.id);
        return {
          ...state,
          data: updatedData,
        };
      case "ADDFOODDATA":
        return {
          ...state,
          food: [...state.food, action.payload],
        };
      case "DELFOODDATA":
        const deleteData = state?.food?.filter((item) => item?.id !== action.payload.id);
        return {
          ...state,
          food: deleteData,
        };
        case "CLEAR_ALL_DATA":
          return initialState; 
      default:
        return state; // Return the current state if the action type is not recognized
    }
  };
  