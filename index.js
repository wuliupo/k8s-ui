import React from 'react';
import App from './components/App';
import {hashHistory} from 'react-router';

React.render(
    <App history={hashHistory} />,
    document.getElementById('app')
);
