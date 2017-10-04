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
  (ownProps, stateProps, dispatchProps)=>(Object.assign({}, ownProps, stateProps, dispatchProps)),
 {"storeKey":"global"})
 (ToDoSummary)

/*let connectSummary = connect(
  mapStateToProps,
  mapDispatchToProps,
  (ownProps, stateProps, dispatchProps)=>(Object.assign({}, ownProps, stateProps, dispatchProps)),
  {"storeKey":"global"}
)(ToDoSummary)


const mapStateToPropsGlobal = (state, ownProps) => {
  return {
    visiblity :  state.visibilityFilter
  }
}

const mapDispatchToPropsGlobal = (dispatch, ownProps) => ({
  addedGlobal: (v) => {
    dispatch(v)
  }
 })


let locaConnectSummary = connect(
  mapStateToPropsGlobal,
  mapDispatchToPropsGlobal,
  (ownProps, stateProps, dispatchProps)=>(Object.assign({}, ownProps, stateProps, dispatchProps))
)(connectSummary)

export default locaConnectSummary*/
