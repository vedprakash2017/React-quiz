import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Players from './Players';
import Players2 from './Player2';
import { socket } from '../app';
import QuestionOptions from './QuestionOptions';
import { setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';
import { resetPlayers } from '../actions/players';

export class QuestionPage extends React.Component {

    submitAnswer = (e) => {
        const ans = e.target.value;
        socket.emit("submitAnswer", ans, (res) => {

            if (res.code === "correct") {
                this.props.setMessage(`Correct. Your score is ${res.score}`);
            } else if (res.code === "incorrect") {
                this.props.setMessage(`Incorrect, The correct answer was ${res.correct}. Your score is ${res.score}`);
            }
        });
    };

    handleReset = () => {
        socket.disconnect();
        socket.connect();
        this.props.resetPlayers();
        this.props.resetType();
        this.props.resetGame();
        this.props.history.push("/");
    };

    render() {
        return (


            <div class="container-bk">
                <div className="content-container">
                
                {this.props.type === "" && <Redirect to="/" />}
                <Fade>
                    {
                        this.props.status === "active" ?
                            <div>
                                {
                                    this.props.message === "" ?
                                        <div>
                                            <div className="list-header">
                                                <h2 className={"box-layout__title"}>{this.props.question.question}</h2>
                                            </div>
                                            <div className="question-background">
                                                <QuestionOptions type={this.props.type} message={this.props.question.message} submitAnswer={this.submitAnswer} options={this.props.question.options} />
                                            </div>
                                            {
                                            // this.props.type === "HOST" && 
                                            <Players2 players={this.props.players} />
                                            }
                                            {/* {
                                                this.props.type === "PLAYER" &&
                                                <Players players={this.props.question.q } />
                                        } */}
                                        </div>
                                        :
                                        <div>
                                            <Fade>
                                                <div className="box-layout__box">
                                                    <h3 className="box-layout__title">{this.props.message}</h3>
                                                </div>
                                            </Fade>
                                        </div>
                                }
                            </div>
                        : 
                            <div className="scoreboard">

                                <div className="list-item">
                                    <h3>Player</h3>
                                    <h3>Score</h3>
                                </div>
                                
                                {
                                    this.props.scoreboard.map((player) => {
                                        return (
                                            <div key={player.name} className="list-item">
                                                <h3>{player.name}</h3>
                                                <h3>{player.score}</h3>
                                            </div>
                                        )
                                    })
                                }


                                <div className="list-button">
                                <div class="btn">
                                            <button class="btn-hover color-9" style={{width:"80%"}} onClick={this.handleReset}>Start Again </button>
                                  </div>
                                    {/* <button className="button" onClick={this.handleReset}>Start Again</button> */}
                                </div>
                            
                            </div>
                    }

                </Fade>

                </div>


                    <cloud class="cloud fade-it"></cloud>
                    <cloud class="cloud fade-it"></cloud>
                    <cloud class="cloud fade-it"></cloud>
                    <cloud class="cloud fade-it"></cloud>
                    
                    <airplane class="airplane">
                        <div class="head"></div>
                        <div class="body-bk">
                            <div class="window"></div>
                            <div class="window"></div>
                            <div class="window"></div>
                        </div>
                        <div class="lwing"></div>
                        <div class="rwing"></div>
                        <div class="tale"></div>
                    </airplane>
                    

                    <ground class="ground">
                    <tree class="tree">
                        <div class="leaves"></div>
                    </tree>
                    <tree class="tree">
                        <div class="leaves"></div>
                    </tree>
                    <tree class="tree">
                        <div class="leaves"></div>
                    </tree>
                    <tree class="tree">
                        <div class="leaves"></div>
                    </tree>
                    <tree class="tree">
                        <div class="leaves"></div>
                    </tree>
                    </ground>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    question: state.game.question,
    type: state.type,
    players: state.players,
    message: state.game.message,
    status: state.game.status,
    scoreboard: state.game.scoreboard
});

const mapDispatchToProps = (dispatch) => ({
    setMessage: (msg) => dispatch(setMessage(msg)),
    resetPlayers: () => dispatch(resetPlayers()),
    resetType: () => dispatch(resetType()),
    resetGame: () => dispatch(resetGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);