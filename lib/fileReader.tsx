"use client"
import React from 'react'
import { fileDoc} from "@/lib/file"

export const docViewer = (file:fileDoc) => {
    if (file.fileType === "pdf" || file.fileType === "doc" || file.fileType === "docx") { 
       return <div> Doc Viewer</div>
    }
    return null;
};

export const audioPlayback = (file:fileDoc) => {
    if (file.fileType === "mp3" || file.fileType === "wav") {
        return <div> Audio Playback </div>
    }
    return null;
};


export const modelViewer = (file:fileDoc) => {
    if (file.fileType === "glb" || file.fileType === "gltf" || file.fileType === "stl") {
        return <div> Model Viewer </div>
    }
    return null;
};

export const imageViewer = (file:fileDoc) => {
    if (file.fileType === "png" || file.fileType === "jpg" || file.fileType === "jpeg" || file.fileType === "webp" || file.fileType === "gif") {
        return <div> Image Viewer </div>
    }
    return null;
};

export const videoPlayer = (file:fileDoc) => {
    if (file.fileType === "mp4" || file.fileType === "mov" || file.fileType === "webm") {
        return <div> Video Player </div>
    }
    return null;
};

export const sheetMusicViewer = (file:fileDoc) => {
    if (file.fileType === "musicxml" || file.fileType === "mxl") {
        return <div> Sheet Music Viewer </div>
    }
    return null;
};

export const renderFile = (file:fileDoc) => {
 return(
    docViewer(file) ||
    audioPlayback(file) ||
    modelViewer(file) ||
    imageViewer(file) ||
    videoPlayer(file) ||
    sheetMusicViewer(file)
 );
};
