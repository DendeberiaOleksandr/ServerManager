import React from 'react'
import {Status} from "../enum/Status";

function ServerList({servers, onDelete, onPing, filter}){

    const iconPing = "/icon-refresh.svg"
    const iconDelete = "/icon-delete.svg"

    return (
        <table className="server-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>IP Address</th>
                    <th>Name</th>
                    <th>Memory</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Ping</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    servers.map(server => {
                        if (filter === Status.ALL){
                            return (
                                <tr key={server.id}>
                                    <td>
                                        <img className="server-icon" src={server.imageUrl}/>
                                    </td>
                                    <td>
                                        {server.ipAddress}
                                    </td>
                                    <td>
                                        {server.name}
                                    </td>
                                    <td>
                                        {server.memory}
                                    </td>
                                    <td>
                                        {server.type}
                                    </td>
                                    <td>
                                        {server.status === 'SERVER_UP' ?
                                            (<div className="server-status green">
                                                {server.status}
                                            </div>) : (
                                                <div className="server-status red">
                                                    {server.status}
                                                </div>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <img alt="Ping"
                                                      onClick={() => onPing(server.ipAddress)}
                                                      src={iconPing} className="icon-default"/>
                                    </td>
                                    <td>
                                        <img alt="Delete"
                                             onClick={() => onDelete(server.id)}
                                             src={iconDelete} className="icon-default"/>
                                    </td>
                                </tr>
                            );
                        } else {
                            return server.status === filter ? (
                                <tr key={server.id}>
                                    <td>
                                        <img className="server-icon" src={server.imageUrl}/>
                                    </td>
                                    <td>
                                        {server.ipAddress}
                                    </td>
                                    <td>
                                        {server.name}
                                    </td>
                                    <td>
                                        {server.memory}
                                    </td>
                                    <td>
                                        {server.type}
                                    </td>
                                    <td>
                                        {server.status === 'SERVER_UP' ?
                                            (<div className="server-status green">
                                                {server.status}
                                            </div>) : (
                                                <div className="server-status red">
                                                    {server.status}
                                                </div>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <img alt="Ping"
                                                      onClick={() => onPing(server.ipAddress)}
                                                      src={iconPing} className="icon-default"/>
                                    </td>
                                    <td>
                                        <img alt="Delete"
                                             onClick={() => onDelete(server.id)}
                                             src={iconDelete} className="icon-default"/>
                                    </td>
                                </tr>
                            ) : null
                        }
                    })
                }
            </tbody>
        </table>
    );
}

export default ServerList;