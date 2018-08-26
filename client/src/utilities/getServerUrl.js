const PROD_ENDPOINT = 'https://wwww.api.palettable.io';
const LOCAL_ENDPOINT = 'http://localhost:4000';
const isLocal = window.location.href.indexOf('localhost') !== -1;

const getServerUrl = () => {
  return isLocal ? LOCAL_ENDPOINT : PROD_ENDPOINT;
};

export default getServerUrl;
