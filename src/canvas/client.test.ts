import { describe, test, expect } from "bun:test";
import { CanvasClient } from "./client";

describe("CanvasClient", () => {
  test("should create a client instance", () => {
    const client = new CanvasClient({
      baseUrl: "https://test.instructure.com",
      accessToken: "test-token",
    });

    expect(client).toBeDefined();
  });

  test("should have all required methods", () => {
    const client = new CanvasClient({
      baseUrl: "https://test.instructure.com",
      accessToken: "test-token",
    });

    expect(typeof client.getCurrentUser).toBe("function");
    expect(typeof client.getCourses).toBe("function");
    expect(typeof client.getAssignments).toBe("function");
    expect(typeof client.getConversations).toBe("function");
    expect(typeof client.getCalendarEvents).toBe("function");
    expect(typeof client.getGrades).toBe("function");
    expect(typeof client.getAllTodos).toBe("function");
  });
});
