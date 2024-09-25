import React, { useState } from "react";
import ImageList from "./ImageList";
import axios from "axios";

const ImageSearchApp = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const fetchImages = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      setError(""); // Reset error
      const response = await axios.get(
        `https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query.trim()}&image_type=photo`
      );
      setImages(response.data.hits);
    } catch (err) {
      setError("Không tìm thấy hình ảnh. Vui lòng thử lại."); // Thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div
      style={{
        margin: 24,
        width: 500,
        paddingRight: 24,
        border: "3px solid #ccc",
        textAlign: "center",
      }}
    >
      <h1>Tìm kiếm hình ảnh</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm hình ảnh"
          style={{ width: "70%", padding: "8px", marginRight: "5px" }} // Thêm kiểu cho ô nhập
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Tìm</button>
      </form>
      {loading && <p>Đang tải hình ảnh...</p>} {/* Thông báo loading */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Hiện thông báo lỗi nếu có */}
      <ImageList images={images} />
    </div>
  );
};

export default ImageSearchApp;
