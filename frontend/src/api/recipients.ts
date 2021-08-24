const RECIPIENT_API = "/recipients/";

export const fetchRecipients = async () =>
  await fetch(RECIPIENT_API)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

export const fetchRecipient = async (recipientId: string) =>
  await fetch(RECIPIENT_API + recipientId).then((res) => res.json());

export const fetchRecipientByParams = async (
  recipientId: string,
  eventType?: string | null,
  caregiverId?: string | null,
  date?: string | null,
  limit?: number,
  offset?: number,
) => {
  var query_param = "?";
  if (eventType) {
    query_param += `&event_type=${encodeURIComponent(eventType)}`;
  }

  if (caregiverId) {
    query_param += `&caregiver=${encodeURIComponent(caregiverId)}`;
  }

  if (date) {
    query_param += `&date=${encodeURIComponent(date)}`;
  }

  if (offset) {
    query_param += `&offset=${encodeURIComponent(offset)}`;
  }

  if (limit) {
    query_param += `&limit=${encodeURIComponent(limit)}`;
  }

  return await fetch(
    RECIPIENT_API + recipientId + "/events" + query_param,
  ).then((res) => res.json());
};

export const fetchUniqueRecipientEvents = async (recipientId: string) => {
  return await fetch(RECIPIENT_API + recipientId + "/unique/events").then(
    (res) => res.json(),
  );
};

export const fetchUniqueRecipientCaregivers = async (recipientId: string) => {
  return await fetch(RECIPIENT_API + recipientId + "/unique/caregiver").then(
    (res) => res.json(),
  );
};
