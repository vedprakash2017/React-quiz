import React from 'react';
import { connect } from 'react-redux';
import RubberBand from 'react-reveal/RubberBand';

export const PlayerItem = (props) => (
<div>
    <div className="scoreboard">

    <div className="list-item">
        <h3>Player</h3>
        <h3>Score</h3>
    </div>

    {
                <div key={player.name} className="list-item">
                    <h3>{props.name}</h3>
                    <h3>{props.score}</h3>
                </div>
    }

    <div className="list-button">
        <button className="button" onClick={this.handleReset}>Start Again</button>
    </div>

    </div>
    <RubberBand>
        <div className="player__items">
            <h3 >{props.name} | {props.score}</h3>
        </div>
    </RubberBand>
    </div>
)

export default PlayerItem;

/*

{
type: 'ADD_PLAYER',
player: {name:"anushan", colour:"red"}
}

*/