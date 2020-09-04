import React from 'react'

const Footer = ()=>{
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, 学习版是tangyan在2020年开发</em>
    </div>
  )
}

export default Footer