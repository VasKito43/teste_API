const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/fipe/preco/:codigoFipe', async (req, res) => {
  const codigoFipe = req.params.codigoFipe;
  
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/fipe/preco/v1/${codigoFipe}`);
    
    if (response.data) {
      const data = response.data;
      res.json({
        message: `O preço médio do ${data[0].marca} ${data[0].modelo} é R$ ${data[0].valor}.`
      });
    } else {
      res.status(404).json({ message: `Não foi possível encontrar informações sobre o preço para o veículo com código FIPE ${codigoFipe}.` });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar informações sobre o preço do veículo. Erro: ${error.message}` });
  }
});

app.get('/cnpj/:cnpj', async (req, res) => {
  const cnpj = req.params.cnpj;
  
  
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const data = response.data;
    res.json({
      message: `O CNPJ ${cnpj} pertence à empresa ${data.razao_social}, localizada em ${data.municipio} - ${data.uf}.`
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar informações do CNPJ.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
