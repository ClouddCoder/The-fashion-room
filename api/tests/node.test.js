const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

describe.skip("POST /register", () => {
  it("If password length is equal or less than or equal to 4", async () => {
    await api
      .post("/register")
      .send({
        userName: "brayan",
        userLastname: "sanchez",
        userEmail: "brayan",
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

describe.skip("POST /login", () => {
  it("If user exists", async () => {
    const response = await api
      .post("/login")
      .send({ userEmail: "brayan", userPassword: "12345" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.userName).toContain("brayan");
  });

  it("If user does not exist", async () => {
    await api
      .post("/login")
      .send({ userEmail: "lucas", userPassword: "12345" })
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });
});

describe.skip("GET /catalogue", () => {
  it("Return catalogue products given a category", async () => {
    const response = await api.get("/catalogue?category=camisas");
    const products = response.body.map((product) => product.product_name);

    expect(products).toContain("camisa-niño");
    expect(response.body).toHaveLength(2);
  });
});

describe("POST /set-wishlist", () => {
  it("Insert new wish to the database", async () => {
    // eslint-disable-next-line operator-linebreak
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiYnJheWFuIiwidXNlckVtYWlsIjoiYnJheWFuIiwiaWF0IjoxNjcyMzc1MTc1fQ._SwAU5xky2Myd2TeZAEeVHz37y-wFy2L6VJ12V55Z3I";
    // First, login with an user to get the token
    await api
      .post("/set-wishlist")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: 656589, remove: false })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

/*
 * Closes the server after each test
 */
afterAll(() => {
  server.close();
});
