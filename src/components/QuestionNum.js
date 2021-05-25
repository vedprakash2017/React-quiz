import React from 'react'
import QuestionText from './QuestionText';
const Stars = ({props}) => {
  let stars = []
  
  for (let i = 0; i < props; ++i) {
    stars.push(<li data-color="#1abc9c">
    <div>
    <div>
        <h3>Question #{i+1}</h3>
    </div>
               
    <QuestionText number={i+1}/>
    </div>
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
                