export const environment = {
  production: true,
  //@ts-ignore
  apiUrl: window["env"]["apiUrl"] || "default",
  //@ts-ignore
  debug: window["env"]["debug"] || false
};
