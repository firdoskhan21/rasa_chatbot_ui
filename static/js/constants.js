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

const { id: userId, task_name: task } = getQueryParams();

const action_name = "action_hello_world";
const taskPorts =
  task === "task1"
    ? 5005
    : task === "task2"
    ? 5006
    : task === "task3"
    ? 5007
    : 5005;
// const rasa_server_url = "http://34.224.98.239/task1/webhooks/rest/webhook";
const rasa_server_url = "http://localhost:5005/webhooks/rest/webhook";

const sender_id = uuidv4();
