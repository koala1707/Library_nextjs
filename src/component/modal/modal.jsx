"use client"
import Field from "./field/field";
import "./modal.css";
import { useState } from 'react';
import NewBook from "./newBook";

const Modal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    owner: "",
    borrowed: false,
    returned: true,
  })
  const [borrowChecked, setBorrowChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(true);

  const formFields = [
    {
      name: "title",
      label: "title",
      placeholder: "Enter a book title",
      type: "text",
    },
    {
      name: "owner",
      label: "owner",
      placeholder: "Enter owner's name",
      type: "text",
    },
    {
      name: "borrowed",
      label: "borrowed",
      type: "checkbox"
    },
    {
      name: "returned",
      label: "returned",
      type: "checkbox"
    },
  ]

  const setTargetValue = (e) => {
    if (e.target.name === "borrowed") {
      setBorrowChecked(!borrowChecked);
      setDetails({ ...details, [e.target.name]: !borrowChecked })
    } else if (e.target.name === "returned") {
      setReturnChecked(!returnChecked);
      setDetails({ ...details, [e.target.name]: !returnChecked })
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value })
    }
  }

  const handleModal = () => {
    setOpenModal(() => !openModal)
  }



  const formModal = () => {
    if (openModal) {
      return (
        <div className="modal-container">
          <form>
            {formFields.map((f, i) => (
              <Field
                key={`${f.name}-${i}`}
                {...f}
                value={details[f.name]}
                onChange={setTargetValue}
                checked={f.name === 'borrowed' ? borrowChecked : returnChecked}
              />
            ))}
          </form>
          <button onClick={handleModal}>Close</button>
          <NewBook newBook={details} handleModal={handleModal}/>
        </div>
      )
    }
  }

  return (
    <>
      <button onClick={handleModal}>Add New Book</button>
      {formModal()}
    </>

  )
}

export default Modal;