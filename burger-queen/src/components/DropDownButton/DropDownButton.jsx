import { useState } from "react";
import { number, string } from "prop-types";
import iconOptions from "../../assets/icon-options.svg";
import style from "../DropDownButton/DropDownButton.module.css";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalEdit from "../ModalEdit/ModalEdit";

export default function DropdownButton ({ id, name, type, price, token }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleDelete = () => {
      setShowModalDelete(true);
      setIsOpen(false); // Close the dropdown
    };
  
    const handleEdit = () => {
      setShowModalEdit(true);
      setIsOpen(false); // Close the dropdown
    };

    const handleCloseModal = () => {
      setShowModalDelete(false);
      setShowModalEdit(false);
    };
  
    return (
      <div className={style.dropdown}>
        <img src={iconOptions} className={style.options} onClick={toggleDropdown} />
        {isOpen && (
          <div className={style.content}>
            <span className={style.btn_options} onClick={handleEdit}>Edit</span>
            <span className={style.btn_options} onClick={handleDelete}>Delete</span>
          </div>
        )}
        {showModalDelete && <ModalDelete id={id} token={token} onClose={handleCloseModal} />}
        {showModalEdit && <ModalEdit id={id} name={name} type={type} price={price} token={token} onClose={handleCloseModal} />}
      </div>
    );
  }

DropdownButton.propTypes = {
  id: number.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  price: number.isRequired,
  token: string.isRequired
}