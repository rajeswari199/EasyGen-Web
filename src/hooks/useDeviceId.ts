export const useDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');
  return deviceId;
};
