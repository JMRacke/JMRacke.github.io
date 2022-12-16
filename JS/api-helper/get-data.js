export function getData(apiURL) {
  return new Promise((resolve, reject) => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((json_payload) => resolve(json_payload))
      .catch((error) => reject(error));
  });
}
