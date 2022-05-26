import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
// import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import React,{useState,useReducer} from 'react'
import Todo from '../Todo'
export const ACTIONS={
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete-todo"
}

function reducer(todos, action){
  switch(action.type) {
    case ACTIONS.ADD_TODO :
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo =>{
        if(todo.id===action.payload.id){
          return{...todo,complete: !todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo =>todo.id !== action.payload.id)
      
  }
}

function newTodo(name){
  return{id: Date.now(),name:name,complete:false}
}


export default function Post({ postData }) {
  const [todos,dispatch]=useReducer(reducer,[])
  const [name, setName]=useState("")

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:ACTIONS.ADD_TODO , payload: {name: name}})
    setName("")
}

console.log(todos)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
<>
<form onSubmit={handleSubmit}>
  <input type="text" value={name} onChange={e => setName(e.target.value)} />
</form>
{todos.map(todo => {
 return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
})}
</>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
