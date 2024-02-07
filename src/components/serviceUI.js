import { useNavigate } from "react-router-dom";

export function ServiceUI(props) {
  let key = "";
  let value = "";
  for (let item in props.item) {
    key = item;
    value = props.item[key];
  }

  const navigate = useNavigate();
  const navigateFunc = () => {
    navigate("/service/" + key);
  };

  return (
    <div
      onClick={navigateFunc}
      className="p-5 cursor-pointer w-1/4 border-2 border-gray-500 shadow-lg rounded-md flex gap-12 flex-row justify-center items-center"
    >
      <p className="text-2xl font-semibold capitalize">{key}</p>

      <div
        className={
          value === "ACTIVE"
            ? "bg-green-500 w-[25px] h-[25px] rounded-full"
            : "bg-red-500 w-[25px] h-[25px] rounded-full"
        }
      ></div>
    </div>
  );
}
