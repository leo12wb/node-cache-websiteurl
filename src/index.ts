const ap = require('./server')
const PORT = 3000;
ap.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});