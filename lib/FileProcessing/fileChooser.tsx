"use client"
import React, { useState } from "react"
import { uploadFile, fileDoc } from "@/lib/FileProcessing/file"
import {Upload} from "lucide-react"

type FileChooserProps = {
  classId: string;
  onUploaded: (file: fileDoc) => void;
};

export const FileChooser = ({ classId, onUploaded }: FileChooserProps) => {
  const [uploading, setUploading] = useState(false);

  const processFile = async (file: File) => {
    setUploading(true);
    const uploaded = await uploadFile(file, classId);
    setUploading(false);
    onUploaded(uploaded);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer"
    >
      <input type="file" onChange={handleFileSelect} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer flex items-center flex-col gap-4">
        {uploading ? "Uploading..." : "Drag a file here, or click to browse"} 
        <Upload className="w-8 h-8"/>
      </label>
    </div>
  );
};