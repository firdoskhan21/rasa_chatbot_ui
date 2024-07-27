function getQueryParams() {
  const params = {};
  const queryString = window.location.search.slice(1);
  const queries = queryString.split("&");
  queries.forEach((query) => {
    const [key, value] = query.split("=");
    params[key] = decodeURIComponent(value);
  });
  return params;
}

const { id: userId, type: task_name } = getQueryParams();

const taskPorts =
  task_name === "task1_darkpattern"
    ? 5005
    : task_name === "task1_regular"
    ? 5006
    : task_name === "task2_darkpattern"
    ? 5007
    : task_name === "task2_regular"
    ? 5008
    : task_name === "task3_darkpattern"
    ? 5009
    : 5010;
// const rasa_server_url = "http://34.224.98.239/task1/webhooks/rest/webhook";
const rasa_server_url = `https://7333-134-109-92-76.ngrok-free.app/webhooks/rest/webhook`;

const sender_id = uuidv4();
