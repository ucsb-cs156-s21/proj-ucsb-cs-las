import { buildUpsertFilter} from "main/services/QuarterFilterService";

import { fetchWithToken } from "main/utils/fetch";

jest.mock("main/utils/fetch", () => ({
  fetchWithToken: jest.fn()
}));

describe("CourseService tests", () => {

  const getToken = jest.fn();
  const onSuccess = jest.fn();
  const onError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("buildUpsertFilter and invoke buildUpsertFilter", async () => {
    const CreateFilter = buildUpsertFilter(getToken, onSuccess, onError);
    await CreateFilter();
    expect(onSuccess).toBeCalledTimes(1);
  });
  
  test("buildUpsertFilter where we expect onError to be called", async () => {
    fetchWithToken.mockImplementation(async () => { throw new Error("mock error"); });
    const CreateFilter = buildUpsertFilter(getToken, onSuccess, onError);
    await CreateFilter();
    expect(onError).toBeCalledTimes(1);
  });
});
