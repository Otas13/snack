/**
 * Created by Ota on 26.04.2017.
 */
import React, { Component } from 'react';
import Store from './store';

import './styles.scss';

let storeSubscription = (callback) => { Store.addListener('change', callback)};
const snackTypes = {
    "warning": "fa fa-exclamation fa-fw",
    "success": "fa fa-check fa-fw",
    "info": "fa fa-info fa-fw",
    "error": "fa fa-times-circle fa-fw"
}

const themes = {
    "light": "light",
    "dark": "dark"
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
            let action = "pop";
            if( emittedData ){
                action = "push";
            }
            this.setState({ items: items });
        });
    }

    componentWillUnmount() {
        storeSubscription.remove();
    }


    removeItem(_this, key){
        let items = [];
        _this.state.items.map((item, i)=>{
            if( key != i ){
                items.push(item);
            }
        });
        this.setState({items: items});
    }

    render(){
        let _this = this;
        let alarm = null;

        let snacks = this.state.items.map((item, i)=> {
            let snackClose = ( item.closeButton ) ? "require-close" : "auto-close";

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
                    <div styleName="icon">
                        <i className={snackTypes[item.type]} aria-hidden="true">&nbsp;</i>
                    </div>
                    <div styleName="content">
                        {item.content}
                    </div>
                    <div styleName="dismiss" onClick={() => _this.removeItem(_this, i)}>
                        <i className="fa fa-times" aria-hidden="true">&nbsp;</i>
                    </div>
                </div>
            );
        });

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
        let theme = "container dark";
        if(this.props.theme){
            theme = themes[this.props.theme] + " container";
        }

        return(
            <div>
                <div className={theme}>
                    {snacks}
                </div>
            </div>
        );
    }
}