import Items from "./ItemModels.js";
import path from "path";
import fs, { unlink, unlinkSync } from "fs";

export const getItems = async (req, res) => {
  try {
    const data = await Items.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getItemByID = async (req, res) => {
  try {
    const data = await Items.findOne({
      where: { id: req.params.id },
    });
    if (data == null) return res.status(404).json({ msg: "Item not found" });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const addItem = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Selected" });
  const Name = req.body.name;
  const file = req.files.file;
  const fileSize = file.data.length;
  const extension = path.extname(file.name);
  const fileName = file.md5 + extension;
  const url = `${req.protocol}://${req.get("host")}/img/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(extension.toLowerCase()))
    return res.status(422).json({ Msg: "Invalid type" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./img/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Items.create({ name: Name, img: fileName, url: url });
      res.status(201).json({ msg: "Item Added" });
    } catch (error) {
      console.log(error);
    }
  });
};

export const edit = async (req, res) => {
  const data = await Items.findOne({
    where: { id: req.params.id },
  });
  if (data == null) return res.status(404).json({ msg: "Item not found" });
  let fileName = "";
  if (req.files === null) {
    fileName = data.img;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const extension = path.extname(file.name);
    fileName = file.md5 + extension;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(extension.toLowerCase()))
      return res.status(422).json({ Msg: "Invalid type" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    const filePath = `./img/${data.img}`;
    fs.unlinkSync(filePath);
    file.mv(`./img/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const Name = req.body.name;
  const url = `${req.protocol}://${req.get("host")}/img/${fileName}`;
  try {
    await data.update(
      { name: Name, img: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.json(err);
  }
};

export const deleteItem = async (req, res) => {
  const data = await Items.findOne({
    where: { id: req.params.id },
  });
  if (data == null) return res.status(404).json({ msg: "Item not found" });
  try {
    const filePath = `./img/${data.img}`;
    fs.unlinkSync(filePath);
    await Items.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
};
