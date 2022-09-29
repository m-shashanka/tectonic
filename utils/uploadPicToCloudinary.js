import axios from "axios";

const uploadPic = async media => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "idrnc3bkx7");

    const res = await axios.post("https://api.cloudinary.com/v1_1/drnc3bkx7/image/upload", form);
    return res.data.url;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default uploadPic;
