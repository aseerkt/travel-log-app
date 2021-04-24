const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

export const listLogEntries = async () => {
  const res = await fetch(`${API_URL}/api/logs`);
  return res.json();
};

export const addLogEntry = async (logData) => {
  const res = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    body: JSON.stringify(logData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { status: res.status, data: await res.json() };
};
