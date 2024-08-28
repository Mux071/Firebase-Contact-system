import React, { useState } from "react";

const useDisClouse = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { onClose, onOpen, isOpen };
};

export default useDisClouse;
