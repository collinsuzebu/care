const EVENT_API = "http://localhost:8000/events/";

export const fetchTopEvents = async () =>
  await fetch(EVENT_API).then((res) => res.json());
