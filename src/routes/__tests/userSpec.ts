import supertest from "supertest";

import app from "../../server";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkthcmVlbSIsImxhc3RfbmFtZSI6IldlenphIiwiZW1haWwiOiJrYXJlZW1mb3VhZDI3QGdtYWlsLmNvbSIsImlhdCI6MTY1NzE1Mzg1OH0.HyeGlFNkgWX5DTHC_OGTfjWvGcnCI_2FfftwP_k_ZE4";

const request = supertest(app);

describe("/users api endpoint testing", () => {
  it("getting all users from /users endpoint", async () => {
    const response = await request
      .get("/api/v1/users")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
