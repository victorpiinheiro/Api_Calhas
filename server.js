import app from './app';

app.listen(3003, (err) => {
  if (err) {
    return console.log('erro ao conectar com o servidor', err);
  }
  console.log('escutando na porta 3003');
});
