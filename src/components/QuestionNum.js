import React from 'react'
import QuestionText from './QuestionText';
const Stars = ({amount}) => {
  let stars = []
  for (let i = 0; i < amount; ++i) {
    stars.push(<li data-color="#1abc9c">
    <div>
        <h3>Question #{i+1}</h3>
    </div>                
    <QuestionText Number={i+1}/>
    </li>    
)
  }

  return (
    <div className="Stars">
      {stars}
    </div>
  )
}

export default Stars
                