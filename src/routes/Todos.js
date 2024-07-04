import React, { useEffect, useReducer, useRef, useState } from 'react'
// useReducer
// 0. initialState
// 1. reducer 구현
// 2. dispatch 사용
// 수정
// 사용하기

const initialState = {
  count : 1,
  todos : [
    // { id : 1, item : "빨래하기", checked : true },
    // { id : 2, item : "공부하기", checked : false }
  ], // { id, item, checked : false }이런 모양으로 있고 싶다
}

const reducer = ( state, action ) => {
  // console.log( state, action ); // 데이터 잘 넘어감 
  switch( action.type ){  //switch는 action속 type으로 움직인다.
      case "ADD" :
        return {
          ...state,
          count : state.count + 1,
          todos : [ ...state.todos, { id : state.count, item : action.payload, checked : false } ]
        }
        case "DEL" :
          return {
            ...state,
            todos : state.todos.filter( item => item.id !== action.payload ) // payload 속 id값으로 비교
          }
        case "TOGGLE" :
          return {
            ...state,
            todos : state.todos.map(( item ) => item.id === action.payload ? 
                                    {...item, checked : !item.checked } : item )
          }
        case "EDIT" :
          return {
            ...state,
            todos : state.todos.map(( item ) => item.id === action.payload.id ? 
                                    action.payload : item )
          }
        default :
          return state;
  }
}

// 목록보기, 입력, 삭제, 수정
// item = { id, item, checked : false}
const Todos = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState); //reducer, 초기값
  const todoRef = useRef();
  // { current : input }

  const addHandle = () => {
    dispatch({ type : "ADD", payload : todoRef.current.value }) 
    todoRef.current.value = "";
  }
  const deleteHandle = (id) => {
    dispatch({ type : "DEL", payload : id }) // payload에 삭제할 id값을 넣는다.
  }
  const checkedHandle = (id) => {
    dispatch({ type : "TOGGLE", payload : id }) // payload에 확인할 id값을 넣는다.
  }
  const [ isEdit, setIsEdit ] = useState(0); // 수정 버튼이 클릭된 todo의 id
  const [ editTodo, setEditTodo ] = useState(null); // 수정된 todo
  // 객체 모양
  const editRef = useRef();

  useEffect(() => {
    if( editRef.current ){
        editRef.current.focus();
    }
  }, [isEdit])

  const editHandle = (id) => {
    setIsEdit(id)
    const find = state.todos.find( item => item.id === id );
    console.log( id, find );
    setEditTodo( find );
  }
  const editSaveHandle = (id) => {
    dispatch({ type : "EDIT", payload : editTodo })
    // payload 자체가 넘어감
    setIsEdit(0);
    setEditTodo(null);
  }
  
  useEffect(() => {
    if( todoRef.current ) todoRef.current.focus();
  }, [])
  return (
    <>
      <div>
        <input type='text'
               ref={ todoRef }
              //  value={ todoRef.current.value }
        />
        <button onClick={ addHandle }>추가</button>
      </div>
      <div>
        {
          state.todos.map(( todo ) => ( 
            

          <div key={todo.id}>
            <span>{ todo.id }</span>
            <input type='checkbox' id={ `id${todo.id}` } checked={ todo.checked }
                   onChange={ () => checkedHandle( todo.id ) } 
            />

            { // 수정으로 보일것이냐 기본으로 보일 것이냐
              isEdit > 0 && todo.id === isEdit ? (
                <>
                  <input type="text" 
                         ref={ editRef }
                         value={ editTodo.item }
                         onChange={ () => setEditTodo( {...editTodo, item : editRef.current.value} ) }
                  />
                  <button onClick={ () => editSaveHandle( todo.id ) }>저장</button>
                </>
              )  :
              <>
                <label htmlFor={`id${todo.id}`}
                      style={ { textDecoration : todo.checked ? "line-through" : "none" } }
                >{ todo.item }</label>
                <button onClick={ () => editHandle( todo.id ) }>수정</button>
              </>
            }
            <button onClick={ () => deleteHandle( todo.id ) }>삭제</button>

          </div> 
          ))
        }
      </div>
    </>
  )
}

export default Todos