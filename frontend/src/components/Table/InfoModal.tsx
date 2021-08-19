import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { keyable } from "../Widgets";

interface InfoModalProps {
  data: object;
  isOpen: boolean;
  onClose: () => void;
}

const buildData = (data: keyable) => {
  var d = [];
  for (let key in data) {
    if (key === "payload") {
      const payload: object[] = [];
      let payloadData = JSON.parse(data[key]);
      payload.push(<div className="modal-data modal-data-title">{key}</div>);

      Object.keys(payloadData).forEach((p) => {
        payload.push(
          <div className="modal-data-payload">
            <div className="modal-data-title modal-data-title-payload">{p}</div>
            <div className="modal-data-info">{payloadData[p]}</div>
          </div>,
        );
      });

      d.push(payload);
    } else {
      d.push(
        <div key={key} className="modal-data">
          <div className="modal-data-title">{key}</div>
          <div className="modal-data-info">{data[key]}</div>
        </div>,
      );
    }
  }
  return d;
};

const InfoModal: React.FC<InfoModalProps> = ({ data, isOpen, onClose }) => {
  const infodata = buildData(data);
  return (
    <>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Event Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{infodata}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Export</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
