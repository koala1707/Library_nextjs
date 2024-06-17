"use client"
import Field from "./field/field";
import "./modal.css";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const Modal = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    owner: "",
    borrowed: false,
    returned: true,
  })
  const [borrowChecked, setBorrowChecked] = useState(false);
  const [returnChecked, setReturnChecked] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    if(submitted){
      let res = fetch('http://localhost:3000/api/books', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({title: details["title"], owner: details["owner"], borrowed: details["borrowed"], returned: details["returned"]}),
        
      })
      res.then(r => {
        if(r.ok) {
          // close a modal
          handleModal();
        }
      })
    }
    setSubmitted(false)
    router.push("http://localhost:3000/");
    router.refresh();
  },[submitted])

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
    setDetails({
      title: "",
      owner: "",
      borrowed: false,
      returned: true
    })
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
          <button onClick={() => setSubmitted(true)}>Submit</button>
        </div>
      )
    }
  }

  return (
    <>
      <button onClick={handleModal} className="add-btn">Add New Book</button>
      {formModal()}
    </>

  )
}

export default Modal;