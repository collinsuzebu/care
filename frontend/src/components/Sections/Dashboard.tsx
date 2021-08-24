import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import * as am4charts from "@amcharts/amcharts4/charts";
import { CalendarIcon, PlusSquareIcon } from "@chakra-ui/icons";
import DatePicker, { DatePickerInput } from "../DatePicker/DatePicker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getRecipients,
  getRecipient,
  getRecipientByParams,
} from "../../redux/thunks";

import Card from "../Widgets";
import BarChart from "../Chart/BarChart";
import ChartHook from "../Chart/ChartHook";
import EventSection from "./EventSection";
import { buildChartData, chartOnlyEvents } from "../../utils";
import { fetchTopEvents } from "../../api/events";
import { fetchRecipientByParams } from "../../api/recipients";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();

  // use state
  const [topEvents, setTopEvents] = useState([]);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [eventType, setEventType] = useState("mood_observation");
  const [selectedRecipient, setSelectedRecipient] = useState({
    id: "",
    name: "",
  });

  // use selector
  const recipients = useAppSelector((state) => state.recipients.data);
  var chartData: object[] = useAppSelector(
    (state) => state.recipientByParams.data,
  );

  chartData = buildChartData(chartData, eventType);

  // fetch all recipients
  useEffect(() => {
    if (recipients.length === 0) {
      dispatch(getRecipients());
    }
  }, []);

  // fetch data of selected recipient
  useEffect(() => {
    if (selectedRecipient.id) {
      dispatch(getRecipient(selectedRecipient.id));
    }
  }, [selectedRecipient]);

  // fetch top 3 events
  useEffect(() => {
    (async () => {
      if (topEvents.length === 0) {
        const top3Events = await fetchTopEvents();
        setTopEvents(top3Events);
      }
    })();
  }, [topEvents]);

  // fetch most recent check-ins (3)
  useEffect(() => {
    (async () => {
      if (selectedRecipient.id) {
        const recent3CheckIns = await fetchRecipientByParams(
          selectedRecipient.id,
          "check_in",
          null,
          null,
          3,
        );
        setRecentCheckIns(recent3CheckIns);
      }
    })();
  }, [selectedRecipient]);

  // fetch by client selected event type
  useEffect(() => {
    if (selectedRecipient.id) {
      let recipientId = selectedRecipient.id;
      let date =
        (startDate && moment(startDate).format()) || "2019-04-23T00:32:29"; //todaydate instead
      let limit = 10;
      let caregiverId = null;
      dispatch(
        getRecipientByParams({
          recipientId,
          eventType,
          caregiverId,
          date,
          limit,
        }),
      );
    }
  }, [selectedRecipient, eventType, startDate]);

  // triggers when a care recipient is changed
  const onChangeRecipient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let id = event.target.value;
    let name = event.target.options[event.target.selectedIndex].text;
    setSelectedRecipient({ id, name });
  };

  const onChangeEventType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(event.target.value);
  };

  return (
    <Box p="12">
      <Flex pb="12">
        <Heading>Welcome,</Heading>
        <Spacer />
        <Text fontSize="2xl" pr="6">
          Select a Care Recipient
        </Text>
        <Select
          data-testid="select-recipients"
          width="11%"
          placeholder="--------"
          onChange={onChangeRecipient}
        >
          {recipients.map((recipient: { id: string; name: string }) => (
            <option
              value={recipient.id}
              key={recipient.id}
              data-testid="recipient-option"
            >
              {recipient.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex color="white">
        <Flex direction="column">
          <Card
            mb={8}
            heading="Top Events"
            subheading="All time events"
            data={topEvents}
          />
          <Card
            heading="Recently Checked-In"
            subheading="Care givers"
            data={recentCheckIns}
          />
        </Flex>

        <div
          style={{
            backgroundColor: "rgba(228, 242, 242, .3)",
            width: "100%",
            borderRadius: "15px",
            marginLeft: "10px",
            textAlign: "center",
          }}
        >
          <Flex justifyContent="space-between" pr="12" pl="12" mb="8" mt="8">
            <div>
              <Stack direction="row" spacing={4} align="center">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  customInput={<DatePickerInput />}
                />
                <Button
                  rightIcon={<CalendarIcon />}
                  colorScheme="teal"
                  variant="solid"
                >
                  This Week
                </Button>
              </Stack>
            </div>
            <div>
              <Select
                placeholder="Event Type"
                bg="teal"
                color="white"
                onChange={onChangeEventType}
                icon={<PlusSquareIcon />}
              >
                {Object.keys(chartOnlyEvents).map((key) => (
                  <option key={key} value={key} style={{ color: "black" }}>
                    {key}
                  </option>
                ))}
              </Select>
            </div>
          </Flex>

          <ChartHook
            data={chartData}
            onChartReady={BarChart}
            type={am4charts.XYChart}
          />
        </div>
      </Flex>
      <EventSection recipientId={selectedRecipient.id} />
    </Box>
  );
};

export default Dashboard;
