/**
 * Created by Ota on 27.04.2017.
 */
import React, { Component } from 'react';
import Emitter from './store';
import Helpers from './helpers'

let flag = true;

export default{
    createSnack: ( snackObject ) => {
        /*
         *       error messages
         */
        if(!snackObject.close) {
            console.error("Property 'close': 'auto' | 'require' not specified.");
            if(!snackObject.time){
                console.error("Property 'close': 'auto' require property 'time': int [ms]");
            }
            flag = false;
        }
        if(!snackObject.closeButton) {
            console.error("Property 'closeButton': true | false not specified.");
            flag = false;
        }
        if(!snackObject.type) {
            console.error("Property 'type': 'info' | 'warning' | 'success' | 'error' not specified.");
            flag = false;
        }
        if(!snackObject.content) {
            console.error("Property 'content': 'text of notification' not specified.");
            flag = false;
        }
        if(snackObject.type === "loading" && !snackObject.id) {
            console.error("Property 'type': 'loading' require property 'id': 'unique id'.");
            flag = false;
        }

        if( flag ) {
            Emitter.emit('change', { action: "push-snack", snack: snackObject });
        }
        return;
    },

    createLoadingSnack: (text) => {
        text = ( typeof options === "undefined" ) ? "Loading" : text;
        let id = Helpers.getOid();
        let snack = {close: "required", closeButton: false, type: "loading", content: text, id: id};
        Emitter.emit('change', { action: "push-snack", snack: snack });
        return id;
    },

    dismissLoadingSnack: (id) => {
        Emitter.emit('change', {action: "dismiss-loading", id: id });
    }
}