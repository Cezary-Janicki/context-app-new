import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import React,{useState} from 'react'


const dressData = {
  id: 'ssg-ssr',
  title: 'When to Use Static Generation v.s. Server-side Rendering',
  date: '2020-01-02'
}
const testData={
  count: 69,
  theme: "sexy"
}
console.log(testData)

export default function Home({ allPostsData},{testData}) {
  console.log(props)
  function changeValue({testData}){
    console.log("hook prop test", testData)

   setState(prevState=>{
     return{...prevState,testData}
   })
  }
  // const [count,setCount]=useState(()=>countInitial())    //doing something only on ren
  // function decrementCount(){
  //   setCount(prevCount=> prevCount-1)
  // }
  // function incrementCount(){
  //   setCount(prevCount=> prevCount+1)
  // }
  // function countInitial(){
  //   console.log("run function")
  //   return 4              //doing something only on ren
  // }
  


  const [state, setState] =useState({count:1,theme:"red"})
  const count=state.count
  const theme=state.theme
  function decrementCount(){
    setState(prevState =>{
      // return{count : prevState.count-1}   //this function overrides the whole state, useful for updating via props!
      return{...prevState, count:prevState.count-1} //this function changes only the coutn value
    })
  }
  function incrementCount(){
    setState(prevState=>{
      return{...prevState,count:prevState.count+1}
    })
  }
  

function resetValue(){
  setState(prevState =>{
    return{...prevState,count:1,theme:"red"}
  })
} 

  // const [state,setState] =useState()
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
{/* Hook */}
      <>

      {/* <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button> */}


               <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <span>{theme}</span>
      <button onClick={incrementCount}>+</button>
      <button onClick={changeValue}>change value </button>
      <button onClick={resetValue}>reset value</button>
      </>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
