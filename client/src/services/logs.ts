import axios, { AxiosResponse } from 'axios';
import { ResError } from '../types/Error';
import { LogEntry, LogEntryDoc } from '../types/LogEntry';

//Queries

export const fetchAllLogs = async () => {
  const res = await axios.get<LogEntryDoc[]>('/logs/all');
  return res.data;
};

export async function fetchMyLogs() {
  const res = await axios.get<LogEntryDoc[]>('/logs');
  return res.data;
}

export async function fetchOneLog(id: string) {
  const res = await axios.get<LogEntryDoc>(`/logs/one/${id}`);
  return res.data;
}

// Mutations

export const addLogEntry = async (logData: LogEntry) => {
  const res = await axios.post<LogEntry, AxiosResponse<LogEntryDoc & ResError>>(
    '/logs',
    logData
  );
  return res.data;
};
