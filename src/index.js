import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, createProvider } from 'react-redux'
import App from './components/App'
import ToDoSummary from './containers/ToDoSummary'
import reducer from './reducers'


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

render(
  <div className="container">
      <GlobalProvider store={globalStore}>
        <ToDoSummary/>
      </GlobalProvider>
      
      <GlobalProvider store={globalStore}>
        <Provider store={personalTodoStore}>
          <App title="Iam a personal to do list" />
        </Provider>
      </GlobalProvider>
      
      <GlobalProvider store={globalStore}>
        <Provider store={workTodoStore}>
          <App title="Iam a work related to do list"/>
        </Provider>
      </GlobalProvider>
  </div>,
  document.getElementById('root')
)
