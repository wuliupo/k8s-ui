import React from 'react';

class Service {
    render(){
        const { resource } = this.props;
        const { spec } = resource;
        return (
            <table className="ui definition table">
                <tbody>
                    <tr>
                        <td className="collapsing">Type</td>
                        <td>{spec.type}</td>
                    </tr>
                    <tr>
                        <td className="collapsing">Ports</td>
                        <td>
                            <table className="ui definition table">
                                <thead className="full-width">
                                    <tr>
                                        <th width="33%">port</th>
                                        <th width="33%">protocol</th>
                                        <th width="33%">targetPort</th>
                                    </tr>
                                </thead>
                                <tbody>{(spec.ports || []).map(p => {
                                    return (<tr key={p.port}>
                                        <td className="ignored">{p.port}</td>
                                        <td>{p.protocol}</td>
                                        <td>{p.targetPort}</td>
                                    </tr>)
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Service;
