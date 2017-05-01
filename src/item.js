/**
 * Created by Ota on 26.04.2017.
 */
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Store from './store';

import './styles.scss';

var storeSubscription = (callback) => { Store.addListener('change', callback)};
const snackTypes = {
    "warning": "fa fa-exclamation",
    "success": "fa fa-check",
    "info": "fa fa-info",
    "error": "fa fa-times-circle"
}

let lock = null;

export default class Item extends Component{

    constructor(props){
        super(props);
        this.state = {items: props.items, key: null};
    }

    componentDidMount() {
        storeSubscription(( emittedData ) => {
            let items = this.state.items;
            items.push( emittedData );
            this.setState({ items: items });
        });
    }

    componentWillUnmount() {
        storeSubscription.remove();
    }


    removeItem(_this){
        _this.state.items.pop();
        this.setState({items: _this.state.items});
    }

    addItem(_this){
        let items = _this.state.items;
        items.push("asdf");
        _this.setState({items: items});
        return;
    }


    render(){
        let _this = this;
        let alarm = null;

        let snacks = this.state.items.map(function(item, i) {
            let snackClose = ( item.closeButton ) ? "require-close" : "auto-close";
            if(i !== _this.state.items.length -1) snackClose += " hide-easy";
            let snacksCounter = (_this.state.items.length > 1) ? "snacks-counter" : "hide";
            if( item.time && item.close === "auto" && !item.expiresAt ) {
                let now = new Date();
                item.expiresAt = new Date(now.setMilliseconds(now.getMilliseconds() + item.time));
            }

            if(item.expiresAt) {
                if (alarm === null) {
                    alarm = item.expiresAt;
                } else {
                    if (alarm > item.expiresAt) {
                        alarm = item.expiresAt;
                    }
                }
            }

            return (
                <div key={i} styleName={snackClose}>
                    <div styleName={snacksCounter}>{ _this.state.items.length }</div>
                    <div styleName="icon">
                        <i className={snackTypes[item.type]} aria-hidden="true">&nbsp;</i>
                    </div>
                    <div styleName="content">
                        {item.content}
                    </div>
                    <div styleName="dismiss" onClick={() => _this.removeItem(_this)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
            );
        });

        console.log("access: " + (alarm > 0 && this.state.key == lock)
            + " lock: " + lock + " key: " + this.state.key + " alarm: " + (alarm - new Date())

        );

        console.log(snacks);
        if(alarm > 0 && this.state.key == lock) {
            alarm = alarm - new Date();
            lock = alarm;
            setTimeout(() => {
                let now = new Date();
                let items = this.state.items;
                items.map( (item, i)=> {
                    if(item.expiresAt <= now){
                        items.splice(i, 1);
                    }
                });
                this.setState({items: items, key: alarm});
            }, alarm);
        }


        return(
            <div>
                <div styleName="container">
                    <CSSTransitionGroup
                        transitionName="snack"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={500}>
                        {snacks}
                    </CSSTransitionGroup>
                </div>
                <div>
                    <button style={{float: "left"}} onClick={()=>_this.addItem(_this)}>Add</button>
                </div>
            </div>
        );
    }
}