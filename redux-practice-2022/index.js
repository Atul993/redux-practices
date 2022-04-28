const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const appltmiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orederCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}

function restockedCakes(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockedIcecreams(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecream: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
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

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
  
      case ICECREAM_ORDERED:
        return {
          ...state,
          numOfIcecream: state.numOfIcecream - 1,
        };
  
      case ICECREAM_RESTOCKED:
        return {
          ...state,
          numOfIcecream: state.numOfIcecream + action.payload,
        };
  
      default:
        return state;
    }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer,
  });
  
// const store = createStore(rootReducer);
const store = createStore(rootReducer, appltmiddleware(logger));

// console.log("initial state", store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log("updated state", store.getState())
// );

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orederCake());
// store.dispatch(orederCake());
// store.dispatch(orederCake());
// store.dispatch(restockedCakes(3));
// store.dispatch(orderIcecream());
// store.dispatch(orderIcecream());
// store.dispatch(restockedIcecreams(2));

const actions = bindActionCreators( { orederCake, restockedCakes, orderIcecream, restockedIcecreams }, store.dispatch );

actions.orederCake();
actions.orederCake();
actions.orederCake();
actions.restockedCakes(3);
actions.orderIcecream();
actions.orderIcecream();
actions.restockedIcecreams(2);

unsubscribe();
