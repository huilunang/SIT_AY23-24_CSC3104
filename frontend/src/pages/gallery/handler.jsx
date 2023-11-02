import {
    createGallery,
    // getAllGallery,
    deleteGallery,
    getOneGallery,
  } from "../../api/wishlist/WishListApiService";

function Handler(state) {
  const handleCreateChange = (e) => {
    const { name } = e.target;
    let data = null;

    if (name === "imageFile") {
      data = e.target.files[0];
      state.preview.set(URL.createObjectURL(e.target.files[0]));
    } else {
      data = e.target.value;
    }

    state.formdata.set((prevFormData) => ({ ...prevFormData, [name]: data }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await createGallery(state.formdata.get.title, state.formdata.get.imageFile);

      if (res.status == 201) {
        res = await getOneGallery(res.data.id);
        state.modalshow.set(false);
        state.formdata.set({ title: "", imageFile: null });
        state.gallery.set([...state.gallery.get, res.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id, modalstate) => async (e) => {
    e.preventDefault();

    try {
      let res = await deleteGallery(id);

      if (res.status == 200) {
        modalstate(false);
        state.gallery.set([...state.gallery.get].filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return ({
    createchange: handleCreateChange,
    createsubmit: handleCreateSubmit,
    delete: (id, state) => handleDelete(id, state)
  })
}

export default Handler;
