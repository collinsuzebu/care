const EVENT_API = "/events/";

export const fetchTopEvents = async () =>
  await fetch(EVENT_API).then((res) => res.json());
