/**
 * Created by Ota on 27.04.2017.
 */
import React, { Component } from 'react';
import Emitter from './store';

export default function Test(message) {
    Emitter.emit('change', message);
}
