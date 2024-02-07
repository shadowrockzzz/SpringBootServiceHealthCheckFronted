import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./searchBar";
import InactiveEndPointTable from "./inactiveEndPointsTable";
import propertiesCofig from "../properties.cofig";

const InactiveServices = () => {
  const [services, setServices] = useState([]);

  const handleSearch = async (fromDate, toDate) => {
    try {
      const response = await axios.get( propertiesCofig.baseAPIURI+"/inactive",
        {
          params: {
            from: fromDate,
            to: toDate,
          },
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 w-full">
      <p className="uppercase font-semibold text-xl">Inactive Services</p>
      <SearchBar onSearch={handleSearch} />
      <InactiveEndPointTable services={services} />
    </div>
  );
};

export default InactiveServices;
