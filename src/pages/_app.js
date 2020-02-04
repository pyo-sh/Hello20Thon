// _app.js로 만들면 자동으로 레이아웃이 된다.
// 그냥 react에 redux 붙이는거랑 next에 redux 붙이는게 달라서
// next에는 next-redux-wrapper를 설치해줘야함.
import React from "react";
import AppLayout from "../components/AppLayout";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import Head from 'next/head';

const Hym = ({ Component, store,}) => {
  return (
      <Provider store={store}>
            <Head>
                <title>HYM</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css"/>
                <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
        <AppLayout>
          <Component />
        </AppLayout>
      </Provider>
  );
};

//getInitalProps가 서버일 때도 실행되고 프론트일 때도 실행되니간 분기처리를 해줘야함.

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  // 여기에다가 store 커스터마이징.
  const middlewares = [sagaMiddleware]; // 변조하거나 기능을 추가.
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          typeof window !== "undefined" &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        ); // compose : 미들웨어끼리 합성,  applyMiddleware 미들웨어 적용
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // 루트사가 연결
  return store; // store를 props로 받을 수 있음.
};

export default withRedux(configureStore)(Hym);
