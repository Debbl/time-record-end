import app from "./src/main";
const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`http://127.0.0.1:${PORT}`);
});
