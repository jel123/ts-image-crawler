import axios from "axios";

function useFetchData(url: string = "") {
  const fetchData = () => {
    const request = axios.get(
      `http://localhost:3001/api/data/${encodeURIComponent(url)}`
    );
    return request.then((res) => res);
  };
  const downloadImage = async (urlImage: string) => {
    const request = await axios.get(
      `http://localhost:3001/api/downloadImage/${encodeURIComponent(urlImage)}`
    );
    return request;
  };
  return {
    fetchData,
    downloadImage,
  };
}

export default useFetchData;
