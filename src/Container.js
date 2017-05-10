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
    "error": "fa fa-times-circle fa-fw",
    "loading": "fa fa-refresh fa-spin fa-fw"
}

const themes = {
    "light": "light",
    "dark": "dark"
}

let lock = null;

export default class Item extends Component{

    constructor(props){
        super(props);
        this.state = {items: [], key: null};
    }

    componentDidMount() {
        storeSubscription(( emittedData ) => {
            let items = this.state.items;

            switch ( emittedData.action ){
                case "push-snack":
                    items.push( emittedData.snack );
                    let action = "pop";
                    if( emittedData ){
                        action = "push";
                    }
                    break;
                case "dismiss-loading":
                    items.map((item, i) => {
                       if( (emittedData.id && item.id === emittedData.id) || (!emittedData.id && item.type === "loading")){
                           items.splice(i, 1);
                       }
                    });
                    break;
                default:
                    break;
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

        // set snack style
        let snacks = this.state.items.map((item, i)=> {
        let snackClose = ( item.closeButton ) ? "require-close" : "auto-close";
        if( item.type === "loading" ) {
            snackClose = "loading";
        }

            // create expiration timestamp
            if( item.time && item.close === "auto" && !item.expiresAt ) {
                let now = new Date();
                item.expiresAt = new Date(now.setMilliseconds(now.getMilliseconds() + item.time));
            }

            // set nearest alarm time
            if( item.expiresAt ) {
                if (alarm === null) {
                    alarm = item.expiresAt;
                } else {
                    if (alarm > item.expiresAt) {
                        alarm = item.expiresAt;
                    }
                }
            }

            return (
                <div key={i} className={snackClose}>
                    <div className="icon">
                        <i className={snackTypes[item.type]} aria-hidden="true"></i>
                    </div>
                    <div className="content">
                        {item.content}
                    </div>
                    <div className="dismiss" onClick={() => _this.removeItem(_this, i)}>
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
                items.map( (item, i) => {
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