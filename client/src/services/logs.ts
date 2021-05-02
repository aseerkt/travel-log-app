import { API_URL } from '../config';
import { LogEntry } from '../types/LogEntry';
import getConfig from '../utils/getConfig';

//Queries

export const fetchAllLogs = async () => {
  const res = await fetch(`${API_URL}/api/logs/all`);
  return await res.json();
};

export async function fetchMyLogs() {
  const res = await fetch(`${API_URL}/api/logs`, {
    headers: { ...getConfig() },
  });
  return await res.json();
}

export async function fetchOneLog(id: string) {
  const res = await fetch(`${API_URL}/api/logs/one/${id}`);
  return await res.json();
}

// Mutations

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
