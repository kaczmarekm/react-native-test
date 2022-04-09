import AsyncStorage from '@react-native-community/async-storage';
import {
  Action,
  applyMiddleware,
  createStore,
  DeepPartial,
  Middleware,
  PreloadedState,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { Logger } from '../logger';
import { rootSaga } from '../saga';
import mainReducer from './mainReducer';

export type AppState = ReturnType<typeof mainReducer>;

const actionLogger: Middleware = () => (next) => (action: Action) => {
  Logger.debug(action.type, action);
  return next(action);
};

export class StoreConfigurator {
  persistReducerConfig = {
    storage: AsyncStorage,
    key: 'root',
    version: 0,
  };

  config(initialState?: DeepPartial<PreloadedState<AppState>>) {
    const persistedReducer = persistReducer(
      this.persistReducerConfig,
      mainReducer,
    );

    const sagaMiddleware = createSagaMiddleware();
    const middlewares: Array<Middleware> = [
      thunkMiddleware,
      sagaMiddleware,
      actionLogger,
    ];

    const store = createStore(
      persistedReducer,
      initialState,
      applyMiddleware(...middlewares),
    );
    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);

    return { store, persistor };
  }
}

export * from './mainReducer';
