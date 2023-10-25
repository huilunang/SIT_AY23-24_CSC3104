import { useEffect, useState } from "react";
import { getAllGallery } from "../api/GalleryApiService";

function Gallery() {
    const [gallery, setGallery] = useState();

    async function getGallery() {
        try {
            const res = await getAllGallery();

            // console.log("This is res: ", res);
            // console.log("this is res data: ", res.data[0].title);

            if (res.status == 200) {
                setGallery(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGallery();
    }, []);

    return (
        <>
        <h1>Gallery</h1>
        <ul>
            {gallery?.map((gal, index) => (
                <li key={index}>{gal.title}</li>
            ))}
        </ul>
        </>
    );
}

export default Gallery;
