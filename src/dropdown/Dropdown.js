import React from 'react'

function Dropdown({dropdown, onChangeFilter}) {
    return (
        <div className="dropdown">
            <button className="dropbtn">{dropdown.title}</button>
            <div className="dropdown-content">
                {dropdown.content.map((item, index) => {
                    return (
                        <div onClick={() => onChangeFilter(item)} style={{cursor: "pointer"}}>
                            <a key={index}>{item}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Dropdown;