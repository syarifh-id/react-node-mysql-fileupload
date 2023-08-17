import React, { useEffect, useState } from "react";
import { Img } from "react-image";
import axios from "axios";

const ItemsList = () => {
  const [Items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  return (
    <div className="container">
      <div className="columns mt-3 is-multiline">
        {Items.map((item) => (
          <div className="column is-one-quarter" key={item.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <Img src={item.url} alt={item.img} crossorigin="anonymous" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{item.name}</p>
                  </div>
                </div>
                <div className="content">
                  <p>Lorem ipsum dolor sit amet.</p>
                  <time datetime="2016-1-1">{item.createAt}</time>
                  <div className="card-footer mt-2">
                    <a className="button is-link is-small card-footer-item">
                      Edit
                    </a>
                    <a className="button is-danger is-small  card-footer-item">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
