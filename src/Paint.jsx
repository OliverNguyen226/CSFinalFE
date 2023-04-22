import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSignalR from './useSignalR';
import Painting from "./Painting";
import { CirclePicker } from 'react-color'
import axios from 'axios';

export default function Paint() {
    const { connection } = useSignalR("/r/paint");
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [pixels, setPixels] = useState([]);
    const [selectedPixel, setSelectedPixel] = useState([]);

    useEffect(() => {
        axios.get(`/api/paintings/${id}`).then(res => {
            setPixels(JSON.parse(res.data.pixels));
            setName(res.data.name);
        })
    }, []);

    useEffect(() => {
        if (!connection) {
            return
        }

        connection.invoke("AddToGroup", id);

        connection.on("PaintingUpdated", (painting) => {
            setPixels(JSON.parse(painting.pixels));
            setName(painting.name);
        })

        return () => {
            connection.invoke("RemoveFromGroup", id);
            connection.off("PaintingUpdated");
        }
    }, [connection])

    const selectPixel = (row, col) => {
        setSelectedPixel([row, col]);
    }

    return <div className="flex flex-col items-center justify-center w-screen gap-5">
        <button onClick={() => navigate("/")}>Back to Gallery</button>
        <input className="text-3xl w-52 text-center" value={name} onChange={e => setName(e.target.value)} />
        <div className="w-52 h-52">
            <Painting pixels={pixels} onPixelClick={selectPixel} />
        </div>
        <CirclePicker onChange={
            (e) => {
                setPixels(pixels => pixels.map((row, rowIndex) => row.map((color, colIndex) => {
                    if (rowIndex == selectedPixel[0] && colIndex == selectedPixel[1]) {
                        return e.hex;
                    }
                    return color;
                })))
            }
        } />
        <button onClick={() => { axios.put(`/api/paintings/${id}`, { id, name, pixels: JSON.stringify(pixels), userId: 1 }) }}>Save All Changes</button>
    </div>
}