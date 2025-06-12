export const uploadImageToImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=58c258f947a2113010411cf51afd6eec`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    return data.data.url; 
};
