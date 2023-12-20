import React, { useState, useEffect } from "react";
import s3DownloadImageHandler from "../services/s3DownloadImageHandler";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const ImageList = ({ imageUrls }) => {
  const [imageDisplays, setImageDisplays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const displays = await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const imageDisplay = await s3DownloadImageHandler.getImageUrl(
            imageUrl
          );
          return imageDisplay;
        })
      );

      setImageDisplays(displays);
    };

    fetchData();
  }, [imageUrls]);

  return (
    <div className="container">
      <div
        className="row justify-content-center text-center"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {imageDisplays.map((imageDisplay) => (
          <div key={uuidv4()} className="col-md-4 mb-3">
            <img
              style={{ width: "150%", marginBottom: "20px" }}
              src={imageDisplay}
              alt={imageDisplay}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ImageList.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageList;
