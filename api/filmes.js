export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      erro: 'Método não permitido'
    });
  }

  const busca = req.query.busca;

  if (!busca || typeof busca !== 'string') {
    return res.status(400).json({
      erro: 'Informe o nome do filme'
    });
  }

  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      erro: 'Chave da API não configurada'
    });
  }

  try {
    const url = new URL('https://www.omdbapi.com/');

    url.searchParams.set('s', busca);
    url.searchParams.set('apikey', apiKey);

    const resposta = await fetch(url);
    const dados = await resposta.json();

    return res.status(200).json(dados);

  } catch (erro) {
    console.error('Erro na OMDb:', erro);

    return res.status(500).json({
      erro: 'Erro ao consultar filmes'
    });
  }
}