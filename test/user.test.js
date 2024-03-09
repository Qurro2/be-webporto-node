import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("user", () => {
  it("user bisa registrasi", async () => {
    const result = await supertest(web).post("/user/register").send({
      email: "testjiwa@gmail.com",
      nama: "jiwatest",
      password: "rahasia",
    });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("aaaa@gmail.com");
    expect(result.body.data.nama).toBe("aaaa");
    expect(result.body.data.password).toBeUndefined();
  });

  it("reject register jika ada yang kosong", async () => {
    const result = await supertest(web).post("/user/register").send({
      email: "",
      nama: "aaaa",
      password: "rahasia",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("Login", () => {
  it("seharusnya bisa login", async () => {
    const result = await supertest(web).post("/user/login").send({
      email: "kuriayun@gmail.com",
      password: "rahasia",
    });
    logger.info(result.body);

    // Periksa status kode HTTP
    expect(result.status).toBe(200);

    // Periksa struktur respons
    expect(result.body.data).toBeDefined();
    expect(result.body.data.token).toBeDefined();
  });

  it("login reject validation jika email tidak terdaftar", async () => {
    const result = await supertest(web).post("/user/login").send({
      email: "kuri@gmail.com",
      password: "rahasia",
    });
    logger.info(result.body);

    // Periksa status kode HTTP
    expect(result.status).toBe(401);

    // Periksa struktur respons
    expect(result.body.errors).toBeDefined();
  });
  it("login reject validation jika password salah", async () => {
    const result = await supertest(web).post("/user/login").send({
      email: "kuriayun@gmail.com",
      password: "rahasi",
    });
    logger.info(result.body);

    // Periksa status kode HTTP
    expect(result.status).toBe(401);

    // Periksa struktur respons
    expect(result.body.errors).toBeDefined();
  });
});

describe("Get data", () => {
  it("mendapatkan data user dengan token", async () => {
    const result = await supertest(web)
      .get("/dev/current")
      .set("Authorization", "596d1d7f-a030-4f9c-9988-4cb304bece76");
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("kuriayun@gmail.com");
    expect(result.body.data.nama).toBe("Qurrota Ayun");
  });
});

describe("update data current", () => {
  it("Seharusnya bisa update data user", async () => {
    const result = await supertest(web)
      .patch("/dev/current/update")
      .set("Authorization", "596d1d7f-a030-4f9c-9988-4cb304bece76")
      .send({
        nama: "Qurrota Ayun",
        password: "rahasia",
      });
    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.nama).toBe("Qurrota Ayun");
  });
});

describe("Logout", () => {
  it("Seharus nya bisa logout user", async () => {
    const result = await supertest(web)
      .delete("/dev/logout")
      .set("Authorization", "596d1d7f-a030-4f9c-9988-4cb304bece76");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("Berhasil Logout");
  });

  it("Reject logout jika token salah", async () => {
    const result = await supertest(web)
      .delete("/dev/logout")
      .set("Authorization", "1656b000-0d74-4b8f-9f5c-5f9d9a4705d");

    logger.info(result.body);
    expect(result.status).toBe(401);
    //expect(result.body.data).toBe("Berhasil Logout");
  });
});
