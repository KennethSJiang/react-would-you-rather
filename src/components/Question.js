import React, {Component} from 'react'
import {connect} from 'react-redux'

class Question extends Component{
  render(){
    console.log(this.props)
    const {question} = this.props
    return(
      <div className='question'>
        <div className='center'>
        <div className='question-info'>
          <span>WOULD YOU RATHER</span>
          <span className='question' style={{backgroundColor:"#D3D3D3"}}>{question.optionOne.text}</span>
          <span>OR</span>
          <span className='question' style={{backgroundColor:"#D3D3D3"}}>{question.optionTwo.text}</span>
        </div>
        <div className='replying-to'>submitted by: {question.author}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({questions}, {id}){
    return{
      question: questions[id]
    }
}

export default connect(mapStateToProps)(Question)
