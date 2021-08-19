import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import "./table.css";
import InfoModal from "./InfoModal";

interface EventTableProps {
  data: any;
}

const EventTable: React.FC<EventTableProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState({});

  const onMouseDown = (recipient: object) => {
    setModalData(recipient);
  };

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Event Type</Th>
          <Th>Logged by</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((recipient: any) => (
          <Tr key={recipient.id}>
            <Td
              className="event-type"
              onClick={onOpen}
              onMouseDown={() => onMouseDown(recipient)}
            >
              {recipient.event_type}
            </Td>
            <Td>{recipient.caregiver_id || "N/A"}</Td>
            <Td>{moment(recipient.timestamp).format("DD MMM YY, hh:mm a")}</Td>
          </Tr>
        ))}
      </Tbody>
      <InfoModal isOpen={isOpen} onClose={onClose} data={modalData} />
      <Tfoot>
        <Tr>
          <Th>Event Type</Th>
          <Th>Logged by</Th>
          <Th>Date</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

export default EventTable;
