import './App.css';
import Dropdown from "./dropdown/Dropdown";
import ServerList from "./server/ServerList";
import AddServerModal from "./server/AddServerModal";
import axios from "axios";
import {useEffect, useState} from "react";
import {Status} from "./enum/Status";

function App() {

    const [filter, setFilter] = useState(Status.ALL)
    const [dropdown, setDropdown] = useState({
        title: Status.ALL,
        content: [
            Status.ALL,
            Status.SERVER_UP,
            Status.SERVER_DOWN
        ]
    })
    const serversEndpoint = 'http://localhost:8080/servers'

    const [servers, setServers] = useState([])

    useEffect(() => {
        updateServers()
    }, [])

    function updateServers(){
        axios
            .get(serversEndpoint)
            .then(response => response.data.data.servers)
            .then(servers => {
                return servers.map(server => {
                    return {
                        ...server,
                        isPinging: false
                    }
                });
            })
            .then(data => setServers(data))
    }

    function saveServer(server){
        axios.post(
            serversEndpoint,
            server
            ).then(() => {
               updateServers()
        })
    }

    function deleteServer(id){
        axios.delete(
            serversEndpoint + `/${id}`
        ).then(() => {
            updateServers()
        })
    }

    function pingServer(ipAddress){
        axios.get(
            serversEndpoint + `/ping/${ipAddress}`
        ).then(() => {
            updateServers()
        })
    }

    function changeFilter(filter){
        setFilter(filter)
        setDropdown({
            ...dropdown,
            title: filter
        })
    }

    const Header = () => {
        return (
            <header>
                <h3>Manage Servers</h3>
                <div style={{marginRight: "10px"}}>
                    <Dropdown onChangeFilter={changeFilter} dropdown={dropdown}/>
                    <AddServerModal onCreateServer={saveServer}/>
                </div>
            </header>
        );
    }

    return (
        <div className="App">
            <Header/>
            <ServerList filter={filter} onPing={pingServer} onDelete={deleteServer} servers={servers}/>
        </div>
    );
}


export default App;
