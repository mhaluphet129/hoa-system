import React, { ChangeEvent, useRef, useState } from "react";
import { Image, Spin, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SelectImageProps } from "@/types";

// todo: "confirm" to upload feature outside this component okay ?
const ImageUpload = ({
  setSelectedFile,
  selectedFile,
  loading,
}: SelectImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selected = files[0];
      if (selected.type.startsWith("image/")) {
        setSelectedFile(selected);
      } else {
        message.warning("Please select an image file.");
        setSelectedFile(null);
      }
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div
      style={{
        background: "#EFF4FB",
        borderStyle: "dashed",
        borderColor: "#3C50E0",
        borderSpacing: 1,
        borderRadius: 10,
        cursor: "pointer",
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      }}
    >
      {loading ? (
        <Spin />
      ) : selectedFile ? (
        <Image
          style={{
            borderRadius: 10,
          }}
          src={URL.createObjectURL(selectedFile)}
        />
      ) : (
        <>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "100%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UploadOutlined
              style={{
                fontSize: 22,
              }}
            />
          </div>
          <span style={{ color: "#3C50E0" }}>Click to Upload</span>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
