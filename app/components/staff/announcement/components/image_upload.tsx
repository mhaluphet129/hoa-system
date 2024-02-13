import { UploadOutlined } from "@ant-design/icons";

const ImageUpload = () => {
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
    >
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
    </div>
  );
};

export default ImageUpload;
