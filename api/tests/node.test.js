const supertest = require("supertest");
const { app, server } = require("../server/index");

const api = supertest(app);

// eslint-disable-next-line operator-linebreak
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiYnJheWFuIiwidXNlckVtYWlsIjoiYnJheWFuIiwiaWF0IjoxNjcyMzc1MTc1fQ._SwAU5xky2Myd2TeZAEeVHz37y-wFy2L6VJ12V55Z3I";

/*
 * Closes the server after each test
 */
afterEach(() => {
  server.close();
});

describe.skip("POST /register", () => {
  it("If password length is equal or less than or equal to 4", async () => {
    const response = await api
      .post("/register")
      .send({
        userName: "brayan",
        userLastname: "sanchez",
        userEmail: "brayan",
        userPassword: "12345",
      })
      .expect("Content-Type", /application\/json/)
      .expect(200);

    expect(response.body.userName).toContain("brayan");
  });

  it("If password is empty", async () => {
    const response = await api
      .post("/register")
      .send({
        userName: "alexa",
        userLastname: "fernandez",
        userEmail: "alexa",
        userPassword: "",
      })
      .expect("Content-Type", /application\/json/)
      .expect(406);

    expect(response.body.errorMessage).toContain("La contraseña debe tener más de 4 caracteres");
  });
});

describe.skip("POST /login", () => {
  it("If user exists", async () => {
    const response = await api
      .post("/login")
      .send({ userEmail: "brayan", userPassword: "12345" })
      .expect(404)
      .expect("Content-Type", /application\/json/);

    expect(response.body.isAuth).toBe(true);
    expect(response.body.userId).toBe(1);
    expect(response.body.userName).toContain("brayan");
  });

  it("If user does not exist", async () => {
    await api
      .post("/login")
      .send({ userEmail: "lucas", userPassword: "12345" })
      .expect(200)
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

describe.skip("PUT /edit-username", () => {
  it("Should update the username", async () => {
    const response = await api
      .put("/edit-username")
      .set("Authorization", `Bearer ${token}`)
      .send({ newUsername: "luladasilva" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe("Username actualizado con éxito");
  });
});

describe.skip("GET /user-phone", () => {
  it("Should return all the phones that the user has", async () => {
    const response = await api
      .get("/user-phone")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(0);
  });
});

describe.skip("POST /add-phone", () => {
  it("Should add a new number to the user", async () => {
    const response = await api
      .post("/add-phone")
      .set("Authorization", `Bearer ${token}`)
      .send({ newPhone: "123456789" })
      .expect("Content-Type", /application\/json/)
      .expect(200);

    expect(response.body.message).toBe("Teléfono agregado con éxito");
    expect(response.body.phone).toBe({ phone_id: 12 });
  });
});

describe.skip("POST /set-wishlist", () => {
  it("Insert new wish to the database", async () => {
    // First, login with an user to get the token
    await api
      .post("/set-wishlist")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: 656589, remove: false })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
