/**
 * Created by Ota on 27.04.2017.
 */
import React, { Component } from 'react';
import Snack from './Snack';

export default class testElm extends Component {

    constructor(props) {
        super(props);
        this.state = {items: props.items};
    }

    add(){
        Snack({close: "auto", time: 3000, type: "info", content: "hello from testElem"});
    }

    add2(){
        Snack({close: "required", closeButton: true, time: 3000, type: "success", content: this.makeid()});
    }

    makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    render(){
        return(
            <div>
            <button onClick={this.add.bind(this)}>auto close</button>
            <button onClick={this.add2.bind(this)}>user close</button>
            </div>
        )
    }
}