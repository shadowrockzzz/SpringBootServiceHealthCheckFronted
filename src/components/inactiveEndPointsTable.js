import React from "react";
import moment from "moment";

const InactiveEndPointTable = ({ services }) => {
  return (
    <table className="table-auto border border-collapse border-gray-300 w-4/5">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 ">Service</th>
          <th className="border border-gray-300 px-4 py-2 ">Status</th>
          <th className="border border-gray-300 px-4 py-2 ">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr key={service.id}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {service.endpoint}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {service.status}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {" "}
              {moment(service.timestamp).format("MM/DD/YYYY h:mm:ss A")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InactiveEndPointTable;
