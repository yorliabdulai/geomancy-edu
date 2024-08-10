/* eslint-disable no-underscore-dangle */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { courseReducer } from './Admin/Course/courseReducer';
import { adminVideoReducer } from './Admin/Video/adminVideoReducer';
import { courseDetailsReducer } from './courseDetails/courseDetailsReducer';
import { userVideoReducer } from './User/Video/userVideoReducer';
import { authReducer } from './Auth/authReducer';

const rootReducer = combineReducers({
  course: courseReducer,
  adminVideo: adminVideoReducer,
  courseDetails: courseDetailsReducer,
  userVideo: userVideoReducer,
  auth: authReducer,
});

const customThunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Check if Redux DevTools Extension is available and use it if so
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(customThunk))
);
