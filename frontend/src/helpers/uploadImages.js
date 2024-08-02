import React from 'react'
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImages = async (image) => {
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","mern_product");
    const resp = await fetch(url,{
        method: "post",
        body: formData
    })

    return resp.json()
}

export default uploadImages
