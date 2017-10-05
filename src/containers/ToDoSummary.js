import { connect } from 'react-redux'
import React from 'react'

const ToDoSummary = ({toDoList}) => {
  return <div>
      Overall todos added - {toDoList}
    </div>
}

const mapStateToProps = (state, ownProps) => {
  return {
    toDoList :  state
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
