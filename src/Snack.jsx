/**
 * Created by Ota on 27.04.2017.
 */
import React, { Component } from 'react';
import Emitter from './store';

let flag = true;

export default function Snack(snackObject)
{
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

    if( flag ) {
        Emitter.emit('change', snackObject);
    }
    return;
}
