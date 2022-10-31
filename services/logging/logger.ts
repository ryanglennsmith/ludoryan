import ILogger from "../../types/ILogger";

const sendLog = async (log: ILogger) => {
  const url = "/api/admin/logging";
  const data = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  };
  const apiCall = await fetch(url, data);
  const response = await apiCall.json();
};

export default sendLog;
