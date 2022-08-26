const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

test("Retorna json", async () => {
  const response = await api.get("/catalogue");
  expect(response.body).toHaveLength(6);
});

/*
 * Closes the server after each test
 */
afterAll(() => {
  server.close();
});
