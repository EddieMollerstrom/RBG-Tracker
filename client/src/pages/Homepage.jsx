import { useEffect, useState } from "react";
import HomepageComp from "../components/Homepage.jsx";

export default function Homepage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/api/trackers/661fde43096acdc8617afda9"
        );
        const data = await response.json();

        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Fel vid fetch", error);
      }
    };
    fetchData();
  }, []);

  return <>{loading ? <p>Laddar...</p> : <HomepageComp data={data} />}</>;
}
