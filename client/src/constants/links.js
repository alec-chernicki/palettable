const BASE_URL: string = window.location.origin;

export const baseUrl = (stringifiedColors: string): string => {
  return `${BASE_URL}/${stringifiedColors}`;
};
