import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { geoCodeLocation } from "../utils/geoCodeLocation";

export const useWeatherLocation = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const cityUrlParam = searchParams.get("name");

  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const getDeviceLocation = async (cityUrlParam: string | null) => {
    if (cityUrlParam) {
      setCityName(cityUrlParam);
    } else {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(async function (position) {
        const res = await geoCodeLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        setLoading(false);
        const devLoc = await res.json();
        navigate({
          pathname: "/city",
          search: `?name=${devLoc.plus_code.compound_code.slice(9)}`,
        });
      });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getDeviceLocation(cityUrlParam);
      setLoading(false);
    })();
  }, [cityUrlParam]);

  return {
    cityName,
    loading,
  };
};
