import { buildSearchTutorHistoryByCourse } from "main/services/TutorHistory/TutorHistoryService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));

describe("TutorHistoryService tests", () => {

  const mockQuery = {
    value: "mock value"
  };

  const getTokenSpy = jest.fn();
  const onSuccessSpy = jest.fn();
  const onErrorSpy = jest.fn();

  afterEach( () => {
    jest.clearAllMocks();
  });

  test("buildSearchTutorHistoryByCourse and invoke searchTutorHistoryByCourse", async () => {
    const searchTutorHistoryByCourse = buildSearchTutorHistoryByCourse(getTokenSpy, onSuccessSpy, onErrorSpy);


    await searchTutorHistoryByCourse(mockQuery);
    expect(onSuccessSpy).toHaveBeenCalledTimes(1);
  });

  test("buildSearchTutorHistoryByCourse where we expect onError to be called", async () => {
    fetchWithToken.mockImplementation( async () => {
      throw new Error("mock error");
    });
    const searchTutorHistoryByCourse = buildSearchTutorHistoryByCourse(getTokenSpy, onSuccessSpy, onErrorSpy);
    await searchTutorHistoryByCourse(mockQuery);
    expect(onErrorSpy).toHaveBeenCalledTimes(1);
  })
})
