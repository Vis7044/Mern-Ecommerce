const imageTobase64 =async (image) => {
    if(!image) {
        return '';
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve,reject)=> {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    console.log(data)
    return data;
}

export default imageTobase64;