import supertest from "supertest";

import app from "../../server";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkthcmVlbSIsImxhc3RfbmFtZSI6IldlenphIiwiZW1haWwiOiJrYXJlZW1mb3VhZDI3QGdtYWlsLmNvbSIsImlhdCI6MTY1NzE1Mzg1OH0.HyeGlFNkgWX5DTHC_OGTfjWvGcnCI_2FfftwP_k_ZE4";

const request = supertest(app);

describe("/orders api endpoint testing", () => {
  it("create new order to /orders api", async () => {
    const response = await request
      .post("/api/v1/orders")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(201);
  });
});
