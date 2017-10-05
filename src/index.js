import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, createProvider } from 'react-redux'
import App from './components/App'
import Toast from './blinxComponents/toast/toast'
import ToDoSummary from './containers/ToDoSummary'
import reducer from './reducers'
import configRouter from "config-router";
import reactExtension from "react-blinx-extension";
import Truss from "blinx";

const getReduxExtension = ()=> {
  if(window.__REDUX_DEVTOOLS_EXTENSION__) {
    return window.__REDUX_DEVTOOLS_EXTENSION__()
  }
}

const personalTodoStore = createStore(reducer, getReduxExtension())
const workTodoStore = createStore(reducer, getReduxExtension())

const globalStore = createStore((state = 0, action) => {
  switch (action.type) {
    case 'TODO_ADDED':
      return ++state
    case 'TODO_REMOVED':
      return --state
    default:
      return state
  }
}, getReduxExtension())


let GlobalProvider = createProvider("global");


configRouter.init({
  default: Truss,
  blinx: Truss,
  react: reactExtension
});


let routes = [{
  path: "/global",
  name: "global",
  moduleConfig: {
      moduleName: 'globalComponent',
      instanceType: "react",
      instanceConfig: {
          container: '#root'
      },
      module: () => <GlobalProvider store={globalStore}>
                      <ToDoSummary/>
                  </GlobalProvider>
  }
},{
  path: "/toast",
  name: "global.toast",
  moduleConfig: {
      moduleName: 'globalComponent',
      instanceType: "react",
      instanceConfig: {
          container: '#root'
      },
      module: () => <GlobalProvider store={globalStore}>
                      <ToDoSummary/>
                  </GlobalProvider>
  }
},{
  path: "/personaltodo",
  name: "global.toast.personaltodo",
  moduleConfig: {
      moduleName: 'personaltodo',
      instanceType: "react",
      instanceConfig: {
          container: '#content'
      },
      module: () => <GlobalProvider store={globalStore}>
                          <Provider store={personalTodoStore}>
                            <App title="Iam a personal to do list" />
                          </Provider>
                    </GlobalProvider>
  }
},
{
  path: "/worktodo",
  name: "global.toast.worktodo",
  moduleConfig: {
      moduleName: 'worktodo',
      instanceType: "react",
      instanceConfig: {
          container: '#content'
      },
      module: () => <GlobalProvider store={globalStore}>
                          <Provider store={workTodoStore}>
                            <App title="Iam a work to do list" />
                          </Provider>
                    </GlobalProvider>
  }
}];


// Configure Router
configRouter.configure(routes, {
  useHash: true,
  ignoreConstraints: true,
  hashPrefix: '',
  trailingSlash: true,
  logger: true,
  history: true,
  listener: true,
  autoCleanUp: false,
  ignoreSearch: true
});

var bundler = function bundler() {
  return function (router) {
      return {
          name: 'BUNDLER_CUSTOM_PLUGIN',
          onTransitionError: function onTransitionError(toState, fromState, err) {
            //Hacky default route :D :P
            window.location.href = window.location.pathname + window.location.search + "#/global/toast/personaltodo";
            window.location.reload(false)
          }
      }
  };
}

configRouter.usePlugin(bundler());
// Start Router
configRouter.start();

