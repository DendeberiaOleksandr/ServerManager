import React, {useState} from 'react'
import {Status} from "../enum/Status";

function AddServerModal({onCreateServer}){
    const [isOpen, setIsOpen] = useState(false);
    const [server, setServer] = useState({
        ipAddress: '',
        name: '',
        memory: '',
        type: '',
        status: Status.SERVER_DOWN
    });

    function handleInputChange(event){
        const target = event.target
        const value = target.value
        const id = target.id

        setServer({
            ...server,
            [id]: value
        })
    }

    function submitHandler(event){
        event.preventDefault();

        onCreateServer(server)
    }

    return (
        <React.Fragment>
            <button className="btn-create-server" onClick={() => setIsOpen(true)}>Create</button>

            {isOpen && (
                <div className={"modal"}>
                    <div className={"modal-body"}>
                        <form onSubmit={submitHandler}>
                            <div className="input-row">
                                <label htmlFor="ipAddress">
                                    IP Address
                                </label>
                                <input value={server.ipAddress} onChange={handleInputChange} type="text" id="ipAddress"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input value={server.name} onChange={handleInputChange} type="text" id="name"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="memory">
                                    Memory
                                </label>
                                <input value={server.memory} onChange={handleInputChange} type="text" id="memory"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="type">
                                    Type
                                </label>
                                <input value={server.type} onChange={handleInputChange} type="text" id="type"/>
                            </div>
                            <div className="input-row">
                                <label htmlFor="status">
                                    Status
                                </label>
                                <select value={server.status} id="status" onChange={handleInputChange}>
                                    <option value={Status.SERVER_UP}>{Status.SERVER_UP}</option>
                                    <option value={Status.SERVER_DOWN}>{Status.SERVER_DOWN}</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit">Create</button>
                                <button onClick={() => setIsOpen(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default AddServerModal;