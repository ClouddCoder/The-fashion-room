const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

test("Retorna los productos", async () => {
  const response = await api.get("/catalogue");
  const products = response.body.map((product) => product.product_name);

  expect(products).toContain("Camisa");
});

/*
 * Closes the server after each test
 */
afterAll(() => {
  server.close();
});
