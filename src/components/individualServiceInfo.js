import { useParams } from "react-router-dom";
import moment, { min } from "moment";

import { useState, useEffect } from "react";
import Graph from "./chart";
import propertiesCofig from "../properties.cofig";

export function IndivServiceInfo() {
  const getHealthStatusesByEndpoint = async (endpoint) => {
    let baseAPIURI = propertiesCofig.baseAPIURI
    try {
      const response = await fetch(
        `${baseAPIURI}/indivServiceStatus?endpoint=${endpoint}`
      );
      const data = await response.json();
      setHealthStatusList(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { serviceEntry, serviceType } = useParams();
  const [healthStatusList, setHealthStatusList] = useState([]);
  const [smallList, setSmallList] = useState([]);

  useEffect(() => {
    if (serviceEntry && serviceType) {
      getHealthStatusesByEndpoint(serviceEntry + "/" + serviceType);
    }
  }, [serviceEntry, serviceType]);

  useEffect(() => {
    let items = [];
    if (healthStatusList.length > 10) {
      items = healthStatusList.slice(-15);
    } else {
      items = [...healthStatusList];
    }
    setSmallList(items);
  }, [healthStatusList]);

  return (
    <div className="flex flex-col justify-center items-center px-10 py-5 gap-10">
      <p className="uppercase font-semibold text-xl">Table Overview</p>
      <table className="table-auto border border-collapse border-gray-300 w-4/5">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Endpoint</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {smallList.map((healthStatus) => (
            <tr key={healthStatus.timestamp}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {healthStatus.endpoint}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {healthStatus.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {moment(healthStatus.timestamp).format("MM/DD/YYYY h:mm:ss A")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="w-full" />
      <div className="w-full flex flex-col justify-center items-center">
        <p className="uppercase font-semibold text-xl"> Graph Overview</p>
        <div className="w-full flex justify-center items-center">
          <Graph healthStatusList={healthStatusList} />
        </div>
      </div>
    </div>
  );
}
