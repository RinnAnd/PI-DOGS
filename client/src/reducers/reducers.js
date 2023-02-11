const initialState = {
  dogs: [],
  dogsCopy: [],
  tempers: [],
  detail: [],
  favorites: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        dogsCopy: action.payload,
      };
    case "GET_TEMPERS":
      return {
        ...state,
        tempers: action.payload,
      };
    case "GET_QUERY":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "ORDER_ABC":
      const sorted =
        action.payload === "A"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sorted,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "ORDER_WEIGHT":
      const sorted2 =
        action.payload === "heavy"
          ? state.dogs.sort((a, b) => {
              return b.minWeight - a.minWeight;
            })
          : state.dogs.sort((a, b) => {
              return a.minWeight - b.minWeight;
            });
      return {
        ...state,
        dogs: sorted2,
      };
    case 'CLEAR_DETAIL':
      return {
        ...state,
        detail: []
      };
    case "FILTER_TEMPERS":
      const allDogs = state.dogsCopy;
      const filter =
        action.payload === "All"
          ? allDogs
          : allDogs.filter((e) => e.temper?.includes(action.payload));
      return {
        ...state,
        dogs: filter,
      };
    case 'ADD_FAVORITE':
      const newDog = state.favorites.find(el => el.id === action.payload[0].id)
      if (newDog) {
        return {
          ...state,
          favorites: [...state.favorites]
        }
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload[0]]
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(e => e.id !== action.payload)
      }
    case "FILTER_CREATED":
      const createdDogs = state.dogsCopy;
      const createdFilterer =
        action.payload === "created"
          ? createdDogs.filter((e) => e.created)
          : action.payload === "api"
          ? createdDogs.filter((e) => !e.created)
          : action.payload === "all" && createdDogs;
      return {
        ...state,
        dogs: createdFilterer,
      };
    default:
      return state;
  }
}

export default rootReducer;
