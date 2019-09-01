import React from 'react';
import { connect } from 'react-redux';

import Navigation from './Navigation';

class KubernetesApp {
    render() {
        return (
            <div className="ui container" style={{marginTop: 40 + "px"}}>
                <div className="ui grid stackable">
                    <div className="four wide column">
                        <h1 className="ui blue header">
                            <i className="cloud upload icon"></i>
                            <div className="content">k8s-ui</div>
                        </h1>
                        <Navigation />
                    </div>
                    <div className="twelve wide column">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default KubernetesApp;
