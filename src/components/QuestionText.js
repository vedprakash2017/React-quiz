import React, { useState } from 'react';

export class Ques extends React.Component {
  render(){
    return(
      <div style={{left:"0px",width:"100%"}}>
      <form>

      <div style={{marginTop:"50px"}}>
      <div className="bool-type" style={{display:"flex",justifyContent:"center"}}>
        <div style={{flex:1}}>
        <p> Multiple </p> <input type="radio" name="type"/>
        </div>

        <div style={{flex:1}}>
        <p> True/False </p> <input type="radio" name="type" />
        </div>
      </div>

      <div>
      <p>Question</p> <input type="text" />
      </div>

      <div className="bool" style={{display:"flex",}}>
        <div style={{flex:1}}>
        <p>True</p> <input type="radio" name="bool"/>
        </div>

        <div style={{flex:1}}>
        <p>False</p> <input type="radio" name="bool" />
        </div>
      </div>

      <div className="multi" style={{display:"flex",justifyContent:"space-around"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{flex:1}}>
        <p>Correct Answer</p> <input type="text" />        
        </div>

        <div style={{flex:1}}>
        <p>Incorrect Answer#1</p> <input type="text" />  
        </div>
        </div>

        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{flex:1}}>
        <p>Incorrect Answer#2</p> <input type="text" />  
        </div>

        <div style={{flex:1}}>
        <p>Incorrect Answer#3</p> <input type="text" />  
        </div>
        </div>
      
      </div>
      </div>
      </form>
      </div>
    )
  }
}
export default Ques;