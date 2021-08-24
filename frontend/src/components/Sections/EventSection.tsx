import React, { useEffect, useState } from "react";
import EventTable from "../Table/EventTable";
import {
  Box,
  Flex,
  Heading,
  Select,
  HStack,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  fetchRecipientByParams,
  fetchUniqueRecipientCaregivers,
  fetchUniqueRecipientEvents,
} from "../../api/recipients";
import { useAppSelector } from "../../redux/hooks";
interface EventSectionProps {
  recipientId: string;
}

const EventSection: React.FC<EventSectionProps> = ({ recipientId }) => {
  const [uniqueEvents, setUniqueEvents] = useState([]);
  const [uniqueCaregivers, setUniqueCaregivers] = useState([]);

  const [filters, setFilters] = useState({
    event_type: "",
    caregiver_id: "",
    offset: 0,
    limit: 10,
  });

  const [filteredData, setFilteredData] = useState([]);
  const recipientData: any = useAppSelector((state) => state.recipient.data);

  useEffect(() => {
    (async () => {
      if (recipientId) {
        const uniqueEventsData = await fetchUniqueRecipientEvents(recipientId);
        setUniqueEvents(uniqueEventsData);
      }
    })();
  }, [recipientId]);

  useEffect(() => {
    (async () => {
      if (recipientId) {
        const uniqueCaregiverData = await fetchUniqueRecipientCaregivers(
          recipientId,
        );
        setUniqueCaregivers(uniqueCaregiverData);
      }
    })();
  }, [recipientId]);

  useEffect(() => {
    (async () => {
      const filterData = await fetchRecipientByParams(
        recipientId,
        filters.event_type,
        filters.caregiver_id,
        null,
        filters.limit,
        filters.offset,
      );
      setFilteredData(filterData);
    })();
  }, [filters, recipientId]);

  const onNavigationClick = (name: string) => {
    if (name === "next") {
      setFilters((state) => {
        return { ...state, offset: state.offset - 10 };
      });
    }

    if (name === "previous") {
      setFilters((state) => {
        return { ...state, offset: state.offset + 10 };
      });
    }
  };

  const onChangeFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
    name: string,
  ) => {
    let value = event.target.value;

    if (name === "event_type") {
      setFilters((state) => {
        return { ...state, event_type: value, offset: 0 };
      });
    }

    if (name === "caregiver") {
      setFilters((state) => {
        return { ...state, caregiver_id: value, offset: 0 };
      });
    }
  };

  const data = filteredData.length === 0 ? recipientData : filteredData; // creative collins use redux selector

  return (
    <Box mt="8">
      <Heading as="h3" size="lg" mb={4} style={{ textAlign: "center" }}>
        Most Recent Events
      </Heading>
      <Flex ml="16" mr="16" mb="8" justifyContent="space-between">
        <Text fontSize="2xl">Filter by</Text>
        <HStack spacing={6}>
          <Select
            variant="filled"
            placeholder="Event"
            onChange={(event) => onChangeFilter(event, "event_type")}
          >
            {recipientId &&
              uniqueEvents.map((evt: any, idx) => (
                <option key={idx} value={evt.event_type}>
                  {evt.event_type}
                </option>
              ))}
          </Select>
          <Select
            variant="filled"
            placeholder="Carer"
            onChange={(event) => onChangeFilter(event, "caregiver")}
          >
            {recipientId &&
              uniqueCaregivers.map((caregiver: any, idx) => (
                <option key={idx} value={caregiver.caregiver_id}>
                  {caregiver.caregiver_id
                    ? caregiver.caregiver_id.substring(0, 8)
                    : "no caregiver Id"}
                </option>
              ))}
          </Select>
        </HStack>
      </Flex>
      <Flex alignContent="center" alignItems="center">
        <Tooltip label="Previous events" bg="gray.200" color="black">
          <IconButton
            mr="4"
            aria-label="Previous events"
            icon={<ChevronLeftIcon />}
            onClick={() => onNavigationClick("previous")}
            disabled={filteredData.length < 10}
          />
        </Tooltip>

        <EventTable data={data} />
        <Tooltip label="Recent events" bg="gray.200" color="black">
          <IconButton
            ml="4"
            aria-label="Recent events"
            icon={<ChevronRightIcon />}
            onClick={() => onNavigationClick("next")}
            disabled={filters.offset === 0}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default EventSection;
