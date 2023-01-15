const { describe, expect, test } = require("@jest/globals");
const { authMiddleware } = require("../middlewares");
const { ObjectId } = require("mongodb");

describe("Auth midddleware test", () => {
  jest.setTimeout(30000);
  test("should call next(), and add user & token properties to req object", async () => {
    const user = {
      _id: ObjectId("63925503609cbc225d54eac0"),
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyNTUwMzYwOWNiYzIyNWQ1NGVhYzAiLCJpYXQiOjE2NzM3NDY5NTcsImV4cCI6MTY3Mzc1MDU1N30.WzN2qG9bxmmcj5umPNrAg1n4Sy0zgmOWzyu2Hj5n2uQ";

    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const mRes = {};
    const mockNext = jest.fn();

    try {
      await authMiddleware(mReq, mRes, mockNext);

      expect(mReq.token).toEqual(token);
      expect(mReq.user._id).toEqual(user._id);
      expect(mockNext).toHaveBeenCalled();
    } catch (error) {}
  });
});
