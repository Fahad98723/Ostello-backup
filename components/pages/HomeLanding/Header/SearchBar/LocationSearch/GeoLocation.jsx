import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  addRecentLocations,
  addUserLocation,
} from "../../../../../../redux/slices/authSlice";

import { geo_api_url } from "../../../../../../utils/constant";
import { isEmpty } from "../../../../../../utils/utils";
import useGeoLocation from "../../../../../hooks/useGeoLocation";

export default function GeoLocation({ reload }) {
  const location = useGeoLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.loaded && !isEmpty(location.coordinates)) {
      const { lat, lng } = location.coordinates;
      axios
        .get(geo_api_url(lat, lng))
        .then(({ data }) => {
          const root = data.results[0];

          dispatch(addUserLocation(root));
          dispatch(addRecentLocations(root));
        })
        .catch((err) => {});
    }
    if (location?.error?.message?.length) {
      toast.error(location.error.message);
    }
  }, [reload, location, dispatch]);

  return null;
}
