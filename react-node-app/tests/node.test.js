const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

describe.skip("GET /login", () => {
  it("If user does not exist", async () => {
    const response = await api
      .post("/login")
      .send({ userEmail: "rodolfo", userPassword: "12345" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.userName).toContain("rodolfo");
  });

  it("If user exists", async () => {
    await api
      .post("/login")
      .send({ userEmail: "rodolfo", userPassword: "12345" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe.skip("POST /register", () => {
  it("If password length is equal or less than 4", async () => {
    await api
      .post("/register")
      .send({
        userName: "rodolfo",
        userLastname: "hernandez",
        userEmail: "rodolfo",
        userPassword: "12345",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("If password is empty", async () => {
    await api
      .post("/register")
      .send({
        userName: "alexa",
        userLastname: "fernandez",
        userEmail: "alexa",
        userPassword: "",
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

describe("POST /set-wishlist", () => {
  it("Insert new wish to the database", async () => {
    // First, login with an user to get the token
    const user = await api
      .post("/login")
      .send({ userEmail: "rodolfo", userPassword: "12345" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .post("/set-wishlist")
      .send({ productId: 656804, quantity: 1 })
      .set("Authorization", `Bearer ${user.body.token}`)
      .expect(200);

    expect(response.body.message).toContain("success");
  });
});

/*
 * Closes the server after each test
 */
afterAll(() => {
  server.close();
});
