import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Note from './components/Note'

const App = ()=>{
  const [all, setAll] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getAll = ()=> {
    return axios 
      .get('https://restcountries.eu/rest/v2/all')
  }

  useEffect(()=>{
    console.log('effect')
    getAll()
    .then(response => {
      setAll(response.data)
    })
  }, [])

  // 根据输入的关键字过滤数据
  const upData = (data, val) => {
   return data.filter(function(ele){
      return ele.name.indexOf(val) !== -1
    })
  }

  // 输入框的输入事件监听函数
  const handleSearchValue = (event) => {
    // 先清空
    let timer;

    let str = event.target.value;
    setSearchValue(str)
    
    timer = setTimeout(()=>{
      clearTimeout(timer) 
      getAll()
      .then(response => {
        setAll(upData(response.data, str))
      })
    }, 600)

  }

  // 展示国家列表
  const showToCountry = (ele, i) => {
    return( 
      <Note key={i} note={ele} ></Note>
    )
  } 

  const showCount = () => {
    if( all.length < 10 && all.length> 1){
      return all.map(showToCountry) 
    }
    if(all.length > 10 || all.length === 0){
      return '请输入相关的国家名称.'
    }
    if(all.length === 1) {
      console.log(all)
      const o = {...all[0]}

     return (<div>
     <h1>{o.name}</h1>
      <p>首都：{o.capital}</p>
      <p>人口：{o.population}</p>
      <h2>语言</h2>
      <li>{o.languages.map(ele => <li>{ele.name}</li>)}</li>
      <div style={{width:200}}>
        <img style={{width:'100%'}} src={o.flag}></img>
      </div>
     </div>)
    }
    
  }

  return(
    <div>
        <div>搜索国家  <input value={searchValue} onChange={handleSearchValue}></input> </div>
          {console.log('render', all.length)}
        <ul>
          {showCount()}
        </ul>
    </div>
  )
}


export default App
