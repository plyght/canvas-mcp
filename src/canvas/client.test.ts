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

  test("should have all conversation/email methods", () => {
    const client = new CanvasClient({
      baseUrl: "https://test.instructure.com",
      accessToken: "test-token",
    });

    expect(typeof client.getConversations).toBe("function");
    expect(typeof client.getConversation).toBe("function");
    expect(typeof client.createConversation).toBe("function");
    expect(typeof client.replyToConversation).toBe("function");
  });

  test("createConversation should accept correct parameters", () => {
    const client = new CanvasClient({
      baseUrl: "https://test.instructure.com",
      accessToken: "test-token",
    });

    const recipients = ["user_123", "user_456"];
    const subject = "Test Subject";
    const body = "Test Body";
    const courseId = 789;

    expect(() => {
      client.createConversation(recipients, subject, body, courseId);
    }).not.toThrow();

    expect(() => {
      client.createConversation(recipients, subject, body);
    }).not.toThrow();
  });

  test("replyToConversation should accept correct parameters", () => {
    const client = new CanvasClient({
      baseUrl: "https://test.instructure.com",
      accessToken: "test-token",
    });

    const conversationId = 123;
    const body = "Test Reply";

    expect(() => {
      client.replyToConversation(conversationId, body);
    }).not.toThrow();
  });
});
