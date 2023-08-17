import React, { useState } from "react";

const Add = () => {
  const [title, setTitle] = useState("");
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form>
          <div className="field">
            <label htmlFor="name" className="label">
              Product Name:
            </label>
            <div className="control">
              <input
                type="text"
                className="productName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <label htmlFor="image" className="image">
              Product Image:
            </label>
            <div className="image-form">
              <input
                type="file"
                className="productImage"
                onChange={loadImage}
              />
              <span>
                <span>Pilih File</span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
