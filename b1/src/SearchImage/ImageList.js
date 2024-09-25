import React from "react";

const ImageList = ({ images }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {images.length === 0 && <p>Không có hình ảnh nào để hiển thị.</p>}
      {images.map((image) => (
        <img
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          style={{ width: "50%", height: "175px", borderRadius:"10px" }}
        />
      ))}
    </div>
  );
};

export default ImageList;
