import { keyable } from "../components/Widgets";

export interface MoodEvent {
  happy: string;
  okay: string;
  sad: string;
}

const isWhole = (value: string) => {
  return Math.floor(parseFloat(value)) === parseFloat(value);
};

const mapEventToValue = (event: any) => {
  const mapper: any = {
    happy: 3,
    okay: 2,
    sad: 1,
  };

  if (event && event.toLowerCase()) return mapper[event.toLowerCase()];

  return event;
};

const mapValueToEvent = (event: any) => {
  if (event === undefined || isNaN(+event)) {
    return event;
  }

  const mapper: any = {
    3: "Happy",
    2: "Okay",
    1: "Sad",
  };

  if (isWhole(event)) {
    return mapper[Math.floor(event)];
  }

  return "";
};

const createDate = (date: string, start: boolean) => {
  let queryDate = date.split("T")[0];
  let startTime = "00:00:00";
  let endTime = "23:59:58";
  let time = start ? startTime : endTime;
  return queryDate + "T" + time + date.slice(-6);
};

export const chartOnlyEvents: keyable = {
  toilet_visit_recorded: "visit_count",
  regular_medication_not_taken: "medication_failure_reason",
  mood_observation: "mood",
  fluid_intake_observation: "consumed_volume_ml",
  concern_raised: "severity",
};

const mapEventTypeToAction = (eventType: string) => {
  let data: keyable = chartOnlyEvents;
  return data[eventType];
};

const buildChartData = (recipientData: any, eventType: any) => {
  var data: any = [];

  const category = recipientData.map((re: any) => {
    let event = mapEventTypeToAction(eventType);
    return JSON.parse(re.payload)[event];
  });

  const time = recipientData.map((re: any) => re.timestamp);

  if (time.length === 0) {
    return data;
  }

  data.push({
    time: new Date(createDate(time[0], true)),
  });
  for (var i = 0; i < category.length; i++) {
    data.push({
      category: category[i],
      time: new Date(time[i]),
      value: mapEventToValue(category[i]),
    });
  }
  // set maximum date for chart
  data.push({
    time: new Date(createDate(time.splice(-1)[0], true)),
  });

  return data;
};

export { mapEventToValue, mapValueToEvent, createDate, buildChartData };
