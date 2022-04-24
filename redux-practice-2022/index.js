const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function orederCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockedCakes(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

// store.dispatch(orederCake());
// store.dispatch(orederCake());
// store.dispatch(orederCake());
// store.dispatch(restockedCakes(3));

const actions = bindActionCreators( { orederCake, restockedCakes }, store.dispatch );

actions.orederCake();
actions.orederCake();
actions.orederCake();
actions.restockedCakes(3);

unsubscribe();
