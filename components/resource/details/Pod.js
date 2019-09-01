import React from 'react';
import Name from '../Name';
import { Link } from 'react-router';

// TODO: Map k8s constants to human names

class Pod {
    render(){
        const { resource } = this.props;
        const { spec, status } = resource;
        return (
            <div>
                <table className="ui definition table">
                    <tbody>
                        <tr>
                            <td className="collapsing">Restart policy</td>
                            <td>{spec.restartPolicy}</td>
                        </tr>
                        <tr>
                            <td className="collapsing">DNS policy</td>
                            <td>{spec.dnsPolicy}</td>
                        </tr>
                        <tr>
                            <td className="collapsing">Node name</td>
                            <td>
                                <Link
                                    to={`/nodes/${spec.nodeName}`}
                                    key={spec.nodeName}
                                    className="item"
                                    activeClassName="active"
                                >{spec.nodeName}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="collapsing">Start time</td>
                            <td>{status.startTime}</td>
                        </tr>
                        <tr>
                            <td className="collapsing">Phase/status</td>
                            <td>{status.phase}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="ui segment">
                    {(spec.containers || []).map(c => {
                        return <div key={c.name}>
                            <Name name={c.name} kind='Container' />
                            <table className="ui definition table">
                                <tbody>
                                    <tr>
                                        <td className="collapsing">Docker image</td>
                                        <td>{c.image}</td>
                                    </tr>
                                    <tr>
                                        <td className="collapsing">Image Pull Policy</td>
                                        <td>{c.imagePullPolicy}</td>
                                    </tr>
                                    <tr>
                                        <td className="collapsing">Container env</td>
                                        <td>{(c.env || []).map(e => {
                                            return (<table key={e.name} className="ui definition table">
                                                <tbody>
                                                    <tr>
                                                        <td className="collapsing">{e.name}</td>
                                                        <td>{e.value}</td>
                                                    </tr>
                                                </tbody>
                                            </table>)
                                        })}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default Pod;
