import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as k8s from '../actions/kubernetes';

@connect(state => ({
    kubernetes: state.kubernetes
}))
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNodes: true,
            showNamespaces: true,
        };
    }
    componentDidMount() {
        this.props.dispatch(k8s.fetchNodes());
        this.props.dispatch(k8s.fetchNamespaces());
    }

    handleClick(showX) {
        this.setState({
            [showX]: !this.state[showX],
        });
    }

    render() {
        const {kubernetes} = this.props;
        return (
            <div className="ui fluid vertical menu">
                <Link to="/" className="header item">
                    <i className="bar chart icon"></i>
                    Dashboard
                </Link>
                <div className="item">
                    <div className="header cursor-pointer" onClick={this.handleClick.bind(this, 'showNodes')}>
                        <i className="server icon"></i>
                        <span>Nodes</span>
                        <i className={'pull-right angle icon ' + (this.state.showNodes ? 'down' : 'up')}></i>
                    </div>
                    <ol className="menu" style={{ display: this.state.showNodes ? 'block' : 'none'}}>
                        {(kubernetes.nodes || []).map(node =>
                            <li key={node.metadata.name}>
                                <Link
                                    to={`/nodes/${node.metadata.name}`}
                                    className="item"
                                    activeClassName="active"
                                >{node.metadata.name}</Link>
                            </li>
                        )}
                    </ol>
                </div>
                <div className="item">
                    <div className="header cursor-pointer" onClick={this.handleClick.bind(this, 'showNamespaces')}>
                        <i className="sitemap icon"></i>
                        <span>Namespaces</span>
                        <i className={'pull-right angle icon ' + (this.state.showNamespaces ? 'down' : 'up')}></i>
                    </div>
                    <ol className="menu" style={{ display: this.state.showNamespaces ? 'block' : 'none'}}>
                        {(kubernetes.namespaces || []).map(ns =>
                            <li key={ns.metadata.name}>
                                <Link
                                    to={`/namespaces/${ns.metadata.name}`}
                                    className="item"
                                    activeClassName="active"
                                >{ns.metadata.name}</Link>
                            </li>
                        )}
                    </ol>
                </div>
                <div className="item">
                    <Link
                        to="/create"
                        className="ui fluid green button"
                    >
                        <i className="plus icon"></i>
                        Create
                    </Link>
                </div>
            </div>
        );
    }
}

export default Navigation;
