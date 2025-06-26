const app = require('./app');

// const PORT = process.env.PORT ||3000;
 const PORT = 3000;
 const baseUrl = import.meta.env.VITE_API_URL;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at ${baseUrl}:${PORT}/api-docs`);
});;