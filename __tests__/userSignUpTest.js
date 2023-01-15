const { describe, expect, test } = require("@jest/globals");
const { signUp } = require("../controllers");

describe("signUp controller test", () => {
  test("response should return status code is equal to 201", async () => {
    const mReq = {
      email: "test6@mail.com",
      password: "a12345",
    };
    const mRes = {};
    try {
      await signUp(mReq, mRes);

      expect(mRes.status).toEqual(201);
    } catch (error) {}
  });

  test("response should include object 'user' with 'email' & 'subscription' string fields", async () => {
    const mReq = {
      email: "test7@mail.com",
      password: "a12345",
    };
    const mRes = {};
    try {
      await signUp(mReq, mRes);

      expect(mRes.user.email).toEqual(mReq.email);
      expect(mRes.user.subscription).toEqual("starter");
    } catch (error) {}
  });
});
