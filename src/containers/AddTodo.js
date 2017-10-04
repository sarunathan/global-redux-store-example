import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ globalDispatch,dispatch }) => {
  let input

  let onSubmit = (e) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    globalDispatch({
      type:"TODO_ADDED"
    })
    dispatch(addTodo(input.value))
    input.value = ''
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input ref={node => {input = node}} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}



const mapGlobalDispatchToProps = (dispatch, ownProps) => ({
  globalDispatch: (v) => {
    dispatch(v)
  }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: (v) => {
    dispatch(v)
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

AddTodo = connect(null,mapGlobalDispatchToProps,mergeProps,{storeKey:"global"})(AddTodo)
AddTodo = connect(null,mapDispatchToProps,mergeProps)(AddTodo)

export default AddTodo
