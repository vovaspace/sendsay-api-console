import { nanoid } from '@reduxjs/toolkit';


export const payloadWithId = (payload) => ({
  payload: { ...payload, id: nanoid() },
});
