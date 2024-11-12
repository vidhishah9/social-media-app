import React from 'react';
import { socket } from '../socket';
import { useState } from "react";

export default function showids() {
    const [displayIds, setdisplayIds] = useState([]);

    socket.on('displayUserIds', (ids) => { //gets data from server to display ids
        setdisplayIds(ids)

    });
    return (
        <p>{displayIds}</p>
    )

}