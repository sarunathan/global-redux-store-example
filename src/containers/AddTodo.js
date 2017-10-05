import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'


class AddTodo extends React.Component {
  render() {
    let input
    let globalDispatch = this.props.globalDispatch;
    let dispatch = this.props.dispatch
    let onSubmit = (e) => {
      e.preventDefault()
      if (!input.value.trim()) {
        return
      }
      globalDispatch()
      dispatch(input.value)
      this.publish("SHOW_TOAST_SUCCESS",{
        text: "To Do is added"
      })
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
