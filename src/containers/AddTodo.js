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
    globalDispatch()
    dispatch(input.value)
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
  globalDispatch: () => {
    dispatch({
      type:"TODO_ADDED"
    })
  }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: (v) => {
    dispatch(addTodo(v))
  }
})

AddTodo = connect(null,mapGlobalDispatchToProps,null,{storeKey:"global"})(AddTodo)
AddTodo = connect(null,mapDispatchToProps,null)(AddTodo)

export default AddTodo
