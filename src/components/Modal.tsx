import { Dispatch, SetStateAction, useState } from "react";
import { styled } from "styled-components";

type ModalType = {
  title: string;
  description: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};
type ModalBackType = {
  show: boolean;
};
const ModalBack = styled.div<ModalBackType>`
  z-index: auto;
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalIsland = styled.div`
  width: 512px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  // align-items: center;
  flex-direction: column;
`;
const StyledButton = styled.button`
  height: 36.5px;
  background-color: #2196f3;
  border: 0px;
  border-radius: 4px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
`;
const ModalTitle = styled.div`
  font-size: 20px;
  color: #27374d;
  font-weight: 600;
  margin-bottom: 16px;
`;
const ModalDescription = styled.div`
  font-size: 16px;
  color: #27374d;
  font-weight: 400;
  margin-bottom: 16px;
`;
export const Modal = ({
  title,
  description,
  open,
  setOpen,
  onClose,
}: ModalType) => {
  const close = () => {
    onClose && onClose();
    setOpen(false);
  };
  return (
    <ModalBack show={open} onClick={close}>
      <ModalIsland>
        <ModalTitle>{title}</ModalTitle>
        <ModalDescription>{description}</ModalDescription>
        <StyledButton>Close</StyledButton>
      </ModalIsland>
    </ModalBack>
  );
};
