/**
 * Created by Ota on 26.04.2017.
 */
import reactDOM from 'react-dom';
import React from 'react';
import Item from './item';
import Element from './testElement';

let items = [
    {close: "auto", closeButton: true, type: "warning", content: "abc", time: 3000},
    {close: "auto", closeButton: true, type: "error", content: "def", time: 1000},
    {close: "auto", closeButton: true, type: "success", time: 2000, content: "ghi dfsgsdfg sdfgsdfgsdfg sfdgsdfg sdfg sdfg sdgfsdfgsdg " +
"ghi dfsgsdfg sdfgsdfgsdfg sfdgsdfg sdfg sdfg sdgfsdfgsdg ghi dfsgsdfg sdfgsdfgsdfg sfdgsdfg sdfg sdfg sdgfsdfgsdg"},
];

reactDOM.render(
    <div>
    <Element/>
    <Item items={items} />
        </div>,
    document.getElementById('app-root')
);
