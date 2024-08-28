import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisClouse from "./hooks/useDisClouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisClouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.error("Error fetching contacts:", error.message, error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value.toLowerCase();

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value)
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative flex-grow items-center ml-1">
            <FiSearch className="text-white absolute text-3xl " />

            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow h-10 border bg-transparent border-white rounded-md text-white pl-9 "
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl cursor-pointer text-white"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />

      <ToastContainer />
    </>
  );
};

export default App;
