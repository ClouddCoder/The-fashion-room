const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

describe("GET /login", () => {
  it("If user does not exist", async () => {
    await api
      .post("/login")
      .send({ email: "cristiano", password: "cristiano" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("If user exists", async () => {
    await api
      .post("/login")
      .send({ email: "rodolfo", password: "12345" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe.skip("POST /register", () => {
  it("If password length is equal or less than 4", async () => {
    await api
      .post("/register")
      .send({
        name: "rodolfo",
        lastname: "hernandez",
        email: "rodolfo",
        password: "12345",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("If password is empty", async () => {
    await api
      .post("/register")
      .send({
        name: "alexa",
        lastname: "fernandez",
        email: "alexa",
        password: "",
      })
      .expect(406)
      .expect("Content-Type", /application\/json/);
  });
});

describe.skip("GET /catalogue", () => {
  it("Return catalogue products", async () => {
    const response = await api.get("/catalogue");
    const products = response.body.map((product) => product.product_name);

    expect(products).toContain("Camisa");
  });
});

/*
 * Closes the server after each test
 */
afterAll(() => {
  server.close();
});
