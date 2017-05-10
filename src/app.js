/**
 * Created by Ota on 26.04.2017.
 */
import reactDOM from 'react-dom';
import React from 'react';
import Container from './Container';
import Element from './testElement';
import Element2 from './testElement2';

reactDOM.render(
    <div>
        <Container />
        <Element/>
        <Element2/>
    </div>,
    document.getElementById('app-root')
);
