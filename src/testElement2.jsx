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
        Snack.createSnack({close: "auto", time: 3000, closeButton: true, type: "success", content: this.makeid()});
    }

    add2(){
        Snack.createSnack({close: "required", closeButton: true, type: "success", content: this.makeid()});
    }

    add3(){
        Snack.createLoadingSnack();
    }

    add4(){
        Snack.dismissLoadingSnack();
    }

    makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 20; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text + "    2";
    }

    render(){
        return(
            <div>
            <button onClick={this.add.bind(this)}>auto close2</button>
            <button onClick={this.add2.bind(this)}>user close2</button>
            <button onClick={this.add3.bind(this)}>create loading2</button>
            <button onClick={this.add4.bind(this)}>dismiss loading2</button>
            </div>
        )
    }
}