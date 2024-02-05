import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Service = () => {
  const [data, setData] = useState(null);
  const { service } = useParams();

  useEffect(() => {
    const getPageData = async (service) => {
      const res = await fetch(`/manifest/${service}.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setData(data);
    };

    getPageData(service);
  }, [service]);

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log("Data: ", data);

  return <div>{service}</div>;
};

export default Service;
