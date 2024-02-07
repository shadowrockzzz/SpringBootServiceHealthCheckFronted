import authService from "../services/authService";
import { useEffect, useState } from "react";
import { ServiceUI } from "./serviceUI";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const getServicesHealth = () => {
    authService.getServices().then((data) => {
      const serviceList = [];
      for (let item in data.data) {
        let obj = {};
        obj[item] = data.data[item];
        serviceList.push({ ...obj });
      }
      setServiceList(serviceList);
    });
  };

  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    if (serviceList.length === 0) {
      getServicesHealth();
    }
  }, [serviceList]);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-center flex justify-center items-center w-full h-[20vh] mt-10 text-3xl uppercase font-bold">
          Dashboard
        </p>
        <div className="flex flex-wrap w-full gap-10 px-5 justify-center items-center">
          {serviceList.map((data, key = 0) => {
            return <ServiceUI key={key} item={data}></ServiceUI>;
          })}
        </div>
        <button
          onClick={() => {
            navigate("/inactive");
          }}
          className="bg-[#464585] px-4 py-2 mt-10 rounded-lg text-white"
        >
          Check for Inactive Servies Log
        </button>
      </div>
    </>
  );
}
