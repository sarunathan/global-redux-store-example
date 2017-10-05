import { connect } from 'react-redux'
import React from 'react'

const ToDoSummary = ({toDoList,completedTodos}) => {
  return <div>
      Overall todos added - {toDoList} <br/>
      Overall completed todos - {completedTodos}
    </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    toDoList :  state.todos,
    completedTodos: state.completedTodos
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  added: (v) => {
    dispatch(v)
  }
 })

 export default connect(mapStateToProps,
  mapDispatchToProps,
  null,
 {"storeKey":"global"})
 (ToDoSummary)
