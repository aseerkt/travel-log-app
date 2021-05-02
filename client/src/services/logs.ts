import { API_URL } from '../config';
import { LogEntry } from '../types/LogEntry';
import getConfig from '../utils/getConfig';

export const listLogEntries = async () => {
  return fetch(`${API_URL}/api/logs`, {
    headers: { ...getConfig() },
  }).then((res) => res.json());
};

export const addLogEntry = async (logData: LogEntry) => {
  const res = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    body: JSON.stringify(logData),
    headers: {
      'Content-Type': 'application/json',
      ...getConfig(),
    },
  });
  return await res.json();
};
