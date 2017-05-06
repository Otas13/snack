/**
 * Created by Ota on 26.04.2017.
 */
import reactDOM from 'react-dom';
import React from 'react';
import Item from './Container';
import Element from './testElement';



reactDOM.render(
    <div>
        <Item />
        <Element/>
    </div>,
    document.getElementById('app-root')
);
