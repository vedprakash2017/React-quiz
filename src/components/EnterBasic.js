import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { setRoom } from '../actions/game';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import AddQuestion from './addQuestion';
import axios from 'axios'

export class EnterBasic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            questionCount: "5",
            error: "",
            background: "",
            changeNum: 1,
            changeNUM1:1
        }
    }
    sethim=()=>{
        console.log("hemlo");
    const multi = document.getElementsByClassName('multi')[0];
        console.log(multi);
    }

    onRoomChange = (e) => {
        const room = e.target.value;
        this.setState({ room });
    };

    onCountChange = (e) => {
        const questionCount = e.target.value;
        this.setState({ questionCount });
    }
    handleReset = (e) =>{

        if(this.state.room!='')
        {
        var mn = 0;
        axios.get('http://localhost:3005/api/v1/quiz/findRoom?room='+this.state.room)
        .then(res => {
            const num = res.data;
            mn = parseInt(num.persent);
            if(mn != 1)
        {
        const changeNum = 0;
        this.setState({ changeNum });
        }
        else
        {
        const changeNum1 = 0;
        this.setState({ changeNum1 });
            alert("Room Name already exist!")
        }
        }
        )
        
        }
        else
        {

        const changeNum1 = 0;

        this.setState({ changeNum1 });
            alert("Please Enter Room Name!")
        }
        // this.props.history.push("/addQuiz");
    }
    submitForm = (e) => {

        // this.props.history.push("/addQuiz");
        // e.preventDefault();
        // const config = {
        //     room: this.state.room,
        //     category: this.state.category,
        //     difficulty: this.state.difficulty,
        //     questionCount: this.state.questionCount
        // };
        // //console.log("submitting")
        // socket.emit("createRoom", config, (res) => {
        //     //console.log("res!", res);
        //     if (res.code === "success") {
        //         this.setState({ error: "" })
        //         this.props.setRoom(this.state.room);
        //         this.props.history.push("/lobby");
        //     } else {
        //         this.setState({ error: res.msg })
        //     }
        // });

    };

    render() {
        return (
            <div className="content-container" style={{height:"90vh"}}>
                {
                    this.props.type === "" && this.props.changeNUM1===1 && <Redirect to="/" />
                }
                
                
                {this.state.changeNum === 1 && <div className="box-layout__box" style={{ background: "rgba(0, 0, 0, 0.1)"}}> 
                    <Fade>
                        <form className="form" >
                        {/* onSubmit={this.submitForm} */}
                            <h1 className={"box-layout__title"}>Create New Game</h1>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}
                            <input
                                type="text"
                                placeholder="Room Name"
                                autoFocus
                                value={this.state.room}
                                onChange={this.onRoomChange}
                                className="text-input"
                            />
                            <select className="select" value={this.state.questionCount} onChange={this.onCountChange}>
                                <option key="5" value="5">5 Questions</option>
                                <option key="10" value="10">10 Questions</option>
                                <option key="15" value="15">15 Questions</option>
                            </select>

                            
                            <div class="btn">
                                            <button class="btn-hover color-9" onClick={this.handleReset} type="button">Create</button>
                            </div>

                        </form>
                    </Fade>

                </div>
            }
            {this.state.changeNum === 0 && this.state.room != '' &&
            <div>
            
            <AddQuestion amount = {this.state.questionCount} roomno = {this.state.room}/>
            {/* <div onClick={this.sethim}>    
                <button> submit </button>
            </div> */}
           </div>
            }

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    categories: state.game.categories,
    type: state.type
});

const mapDispatchToProps = (dispatch) => ({
    setRoom: (room) => dispatch(setRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterBasic);