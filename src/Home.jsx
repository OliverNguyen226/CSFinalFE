import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignalR from "./useSignalR";
import Painting from "./Painting";
import axios from 'axios';

export default function Home() {
    const { connection } = useSignalR("/r/paint");
    const navigate = useNavigate();
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        if (!connection) {
            return
        }

        connection.on("PaintingCreated", (painting) => {
            setPaintings(paintings => [...paintings, painting])
        })

        return () => {
            connection.off("PaintingCreated");
        }
    }, [connection])

    useEffect(() => {
        axios.get("/api/paintings").then(res => setPaintings(res.data));
    }, [])

    const createPainting = () => {
        axios.post("/api/paintings", {
            name: "Untitled", 
            pixels: JSON.stringify([["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
            ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]]), 
            userId: 1
        }).then(res => {
            navigate(`/paint/${res.data.id}`);
        });
    }

    const openPainting = (painting) => {
        navigate(`/paint/${painting.id}`);
    }

    return (
        <div className="flex flex-col justify-center items-center w-screen gap-5">
            <p className="text-5xl font-bold">Pixel Paint</p>
            <p>{connection ? "Connected" : "Not connected"}</p>
            <button onClick={createPainting}>Create a painting</button>
            <p className="text-3xl font-bold">Gallery</p>
            <div className="grid grid-cols-3 gap-4">
                {paintings.map(painting => <div key={painting.id} className="w-40 h-44 cursor-pointer flex flex-col" onClick={() => openPainting(painting)}>
                    <Painting pixels={JSON.parse(painting.pixels)} />
                    <p className="self-center">{painting.name}</p>
                </div>)}
            </div>
        </div>
    );
}
