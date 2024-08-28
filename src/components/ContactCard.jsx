import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { useState } from "react";
import useDisClouse from "../hooks/useDisClouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisClouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
      // Make sure 'contacts' matches your collection name
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <>
      <div className="bg-yellow flex justify-between items-center p-2 rounded-lg">
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-2">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-purple cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
