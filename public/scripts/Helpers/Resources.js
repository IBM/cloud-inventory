const { resourceControllerApi } = require("./Api");

// Funcao responsavel por pegar todos os recursos presentes na conta
const getResources = async (token, nextUrl) => {
  const query = nextUrl ? nextUrl : "/v2/resource_instances";
  const response = await resourceControllerApi
    .get(query, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      event.sender.send("notification", {
        kind: "error",
        title: `Error ${error.response.status}: ${error.response.statusText}`,
        description: error.response.data.message,
        caption: new Date().toLocaleTimeString(),
      });

      return null;
    });

  // Se a requisicao falhar retorna uma nulo
  if (!response) {
    return null;
  }

  // Esta req tem um limit de 100 items por resposta quando for necessario fazer
  // outra req para buscar os dados o parm next_url vira com a url a ser chamada
  const next = response.data.next_url;
  const data = response.data.resources;

  // Verificamos se existe mais items a serem buscados
  if (next) {
    return data.concat(await getResources(token, next));
  } else {
    return data;
  }
};

module.exports = { getResources };
