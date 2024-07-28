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

const uriMappings={
    "task1_darkpattern": 5006,
    "task1_regular": 5005,
    "task2_darkpattern": 5007,
    "task2_regular": 5006,
    "task3_darkpattern": 5005,
    "task3_regular": 5007
}

// const rasa_server_url = "http://34.224.98.239/task1/webhooks/rest/webhook";
const rasa_server_url = `${uriMappings[task_name]}/webhooks/rest/webhook`;

const sender_id = uuidv4();
