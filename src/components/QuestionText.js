import React, { useState } from 'react';

export class Ques extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type:"multi"
        // room: "",
        // category: "0",
        // difficulty: "any",
        // questionCount: "5",
        // error: "",
        // background: ""
    }

    // this.setQue = this.setQue.bind(this);
  }
  componentDidMount(){
    this.setQue(this.state.type);
  }
  handleChange = (event) =>
  {
    this.setState({type: event.target.value});
    this.setQue(event.target.value);
  }
  setQue = (value)=>
  {
    const multi = document.getElementsByClassName('multi')[this.props.number-1];     
    const boolType = document.getElementsByClassName('bool')[this.props.number-1];  
    if(value == 'bool')
    {
      multi.setAttribute("style", "display:none");
      boolType.setAttribute("style", "display:block");
    }
    else
    {
      boolType.setAttribute("style", "display:none");
      multi.setAttribute("style", "display:block");
    }
  }
  render(){
    return(

      <div style={{marginTop:"100px"}}>
      <div className={ 'bool-type-'+this.props.number} style={{display:"flex",justifyContent:"center"}}  >
        <div style={{flex:1}}>
        

          <select value={this.state.type} name={"type-"+this.props.number} onChange={this.handleChange}>
            <option value="multiple">Multiple</option>
            <option value="bool">True/False</option>
          </select>
        
        </div>
    </div>

      <div>
      <p>Question</p> <input type="text" name={"question-"+this.props.number}/>
      </div>

      <div className="bool" style={{display:"flex",}}>
        <div style={{flex:1}}>
        <p>True</p> <input type="radio" name={"bool-"+this.props.number} value="True"/>
        </div>

        <div style={{flex:1}}>
        <p>False</p> <input type="radio" name={"bool-"+this.props.number} value="False"/>
        </div>
      </div>

      <div className="multi" style={{display:"flex",justifyContent:"space-around"}}>
        <div style={{display:"flex", flexDirection:"row"}}>
        <div style={{flex:1}}>
        <p>Correct Answer</p> <input type="text" name={"correct-"+this.props.number}/>        
        </div>

        <div style={{flex:1}}>
        <p>Incorrect Answer#1</p> <input type="text" name={"incorrect#1-"+this.props.number}/>  
        </div>
        </div>

        <div style={{display:"flex", flexDirection:"row"}}>
        <div style={{flex:1}}>
        <p>Incorrect Answer#2</p> <input type="text" name={"incorrect#2-"+this.props.number}/>  
        </div>

        <div style={{flex:1}}>
        <p>Incorrect Answer#3</p> <input type="text" name={"incorrect#3-"+this.props.number}/>  
        </div>
        </div>
      
      </div>

      <div>
        {/* <button> Send </button> */}
      </div>
      </div>
    )
  }
}
export default Ques;