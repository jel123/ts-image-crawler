import axios from "axios";

function useFetchData(url: string = "") {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const fetchData = () => {
    const request = axios.get(
      `${serverUrl}api/data/${encodeURIComponent(url)}`
    );
    return request.then((res) => res);
  };
  const downloadImage = async (urlImage: string) => {
    const request = await axios.get(
      `${serverUrl}api/downloadImage/${encodeURIComponent(urlImage)}`
    );
    return request;
  };
  return {
    fetchData,
    downloadImage,
  };
}

export default useFetchData;
