import {
  createGallery,
  deleteGallery,
  getOneGallery,
  updateGallery,
} from "../../api/wishlist/WishListApiService";

function Handler(state) {
  const handleCreateChange = (e) => {
    const { name } = e.target;
    let data = null;

    if (name === "imageFile") {
      data = e.target.files[0];

      if (data !== undefined) {
        state.preview.set(data);
      } else {
        state.preview.set(null);
      }
    } else {
      data = e.target.value;
      state.formdata.set((prevFormData) => ({ ...prevFormData, [name]: data }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await createGallery(
        state.formdata.get.title,
        state.preview.get
      );

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

  const handleUpdateChange = (formdata) => (e) => {
    const { name } = e.target;
    let data = null;

    if (name === "imageFile") {
      data = e.target.files[0];

      if (data !== undefined) {
        state.preview.set(data);
      } else {
        state.preview.set(null);
      }
    } else {
      data = e.target.value;
      formdata.set((prevFormData) => ({ ...prevFormData, [name]: data }));
    }
  };

  const handleUpdate = (formdata, modalstate) => async (e) => {
    e.preventDefault();

    const image =
      state.preview.get !== undefined ? state.preview.get : formdata.get.imageFile;

    try {
      const res = await updateGallery(
        formdata.get.id,
        formdata.get.title,
        image
      );

      if (res.status == 200) {
        modalstate.set(false);

        const updatedList = state.gallery.get.map((item) => {
          if (item.id === formdata.get.id) {
            return {
              id: formdata.get.id,
              title: formdata.get.title,
              image: image,
            };
          }
          return item;
        });

        state.gallery.set(updatedList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id, modalstate) => async (e) => {
    e.preventDefault();

    try {
      const res = await deleteGallery(id);

      if (res.status == 200) {
        modalstate(false);
        state.gallery.set(
          [...state.gallery.get].filter((item) => item.id !== id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    createchange: handleCreateChange,
    createsubmit: handleCreateSubmit,
    updatechange: (formdata) => handleUpdateChange(formdata),
    updatesubmit: (formdata, modalstate) => handleUpdate(formdata, modalstate),
    delete: (id, state) => handleDelete(id, state),
  };
}

export default Handler;
