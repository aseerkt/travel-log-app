function getConfig() {
  return { authorization: `Bearer ${localStorage.getItem('jwt')}` };
}

export default getConfig;
