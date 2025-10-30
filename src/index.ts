import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { CanvasClient } from "./canvas/client.js";

const CANVAS_BASE_URL = process.env.CANVAS_BASE_URL || "";
const CANVAS_ACCESS_TOKEN = process.env.CANVAS_ACCESS_TOKEN || "";

if (!CANVAS_BASE_URL || !CANVAS_ACCESS_TOKEN) {
  console.error(
    "Error: CANVAS_BASE_URL and CANVAS_ACCESS_TOKEN environment variables are required"
  );
  process.exit(1);
}

const canvasClient = new CanvasClient({
  baseUrl: CANVAS_BASE_URL,
  accessToken: CANVAS_ACCESS_TOKEN,
});

const tools: Tool[] = [
  {
    name: "get_current_user",
    description: "Get information about the currently authenticated user",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_courses",
    description: "List all courses for the current user",
    inputSchema: {
      type: "object",
      properties: {
        enrollment_state: {
          type: "string",
          description: "Filter by enrollment state (active, completed, etc.)",
          default: "active",
        },
      },
    },
  },
  {
    name: "get_course",
    description: "Get details about a specific course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "list_assignments",
    description: "List all assignments for a course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "get_assignment",
    description: "Get details about a specific assignment",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
        assignment_id: {
          type: "number",
          description: "The ID of the assignment",
        },
      },
      required: ["course_id", "assignment_id"],
    },
  },
  {
    name: "get_submission",
    description: "Get submission details for an assignment",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
        assignment_id: {
          type: "number",
          description: "The ID of the assignment",
        },
      },
      required: ["course_id", "assignment_id"],
    },
  },
  {
    name: "submit_assignment",
    description: "Submit an assignment",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
        assignment_id: {
          type: "number",
          description: "The ID of the assignment",
        },
        submission_type: {
          type: "string",
          description: "Type of submission (online_text_entry, online_url, online_upload)",
        },
        body: {
          type: "string",
          description: "Text content for online_text_entry submissions",
        },
        url: {
          type: "string",
          description: "URL for online_url submissions",
        },
        file_ids: {
          type: "array",
          items: { type: "number" },
          description: "Array of file IDs for online_upload submissions",
        },
      },
      required: ["course_id", "assignment_id", "submission_type"],
    },
  },
  {
    name: "list_conversations",
    description: "List all conversations (messages) in the user's inbox",
    inputSchema: {
      type: "object",
      properties: {
        scope: {
          type: "string",
          description: "Filter conversations by scope (inbox, unread, starred, sent, archived)",
          default: "inbox",
          enum: ["inbox", "unread", "starred", "sent", "archived"],
        },
      },
    },
  },
  {
    name: "get_conversation",
    description: "Get details about a specific conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "create_conversation",
    description: "Create a new conversation (send a message)",
    inputSchema: {
      type: "object",
      properties: {
        recipients: {
          type: "array",
          items: { type: "string" },
          description: "Array of recipient IDs (e.g., ['user_123', 'user_456'])",
        },
        subject: {
          type: "string",
          description: "Subject line of the message",
        },
        body: {
          type: "string",
          description: "Body content of the message",
        },
        course_id: {
          type: "number",
          description: "Optional course ID to associate with the conversation",
        },
        group_conversation: {
          type: "boolean",
          description: "Create as a group conversation (all recipients can see each other)",
          default: false,
        },
      },
      required: ["recipients", "subject", "body"],
    },
  },
  {
    name: "reply_to_conversation",
    description: "Reply to an existing conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation to reply to",
        },
        body: {
          type: "string",
          description: "Body content of the reply",
        },
      },
      required: ["conversation_id", "body"],
    },
  },
  {
    name: "mark_conversation_read",
    description: "Mark a conversation as read",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "mark_conversation_unread",
    description: "Mark a conversation as unread",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "star_conversation",
    description: "Star a conversation for easy access",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "unstar_conversation",
    description: "Remove star from a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "archive_conversation",
    description: "Archive a conversation",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "delete_conversation",
    description: "Delete a conversation permanently",
    inputSchema: {
      type: "object",
      properties: {
        conversation_id: {
          type: "number",
          description: "The ID of the conversation",
        },
      },
      required: ["conversation_id"],
    },
  },
  {
    name: "list_calendar_events",
    description: "List calendar events within a date range",
    inputSchema: {
      type: "object",
      properties: {
        start_date: {
          type: "string",
          description: "Start date in ISO 8601 format (e.g., 2024-01-01)",
        },
        end_date: {
          type: "string",
          description: "End date in ISO 8601 format (e.g., 2024-12-31)",
        },
      },
    },
  },
  {
    name: "get_upcoming_assignments",
    description: "Get upcoming assignments and events",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_course_grades",
    description: "Get grades for a specific course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "get_all_grades",
    description: "Get grades for all enrolled courses",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_todos",
    description: "List all todo items across all courses",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_course_todos",
    description: "List todo items for a specific course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "list_course_modules",
    description: "List all modules for a course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "list_announcements",
    description: "List announcements (optionally filtered by course)",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "Optional course ID to filter announcements",
        },
      },
    },
  },
  {
    name: "list_files",
    description: "List files (optionally filtered by course)",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "Optional course ID to filter files",
        },
      },
    },
  },
  {
    name: "get_file",
    description: "Get information about a specific file",
    inputSchema: {
      type: "object",
      properties: {
        file_id: {
          type: "number",
          description: "The ID of the file",
        },
      },
      required: ["file_id"],
    },
  },
  {
    name: "list_quizzes",
    description: "List all quizzes for a course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
      },
      required: ["course_id"],
    },
  },
  {
    name: "get_quiz_submission",
    description: "Get submission details for a quiz",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
        quiz_id: {
          type: "number",
          description: "The ID of the quiz",
        },
      },
      required: ["course_id", "quiz_id"],
    },
  },
  {
    name: "search_course_users",
    description: "Search for users in a course",
    inputSchema: {
      type: "object",
      properties: {
        course_id: {
          type: "number",
          description: "The ID of the course",
        },
        search_term: {
          type: "string",
          description: "Search term (name or email)",
        },
      },
      required: ["course_id", "search_term"],
    },
  },
];

const server = new Server(
  {
    name: "canvas-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "get_current_user": {
        const user = await canvasClient.getCurrentUser();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(user, null, 2),
            },
          ],
        };
      }

      case "list_courses": {
        const enrollmentState = (args?.enrollment_state as string) || "active";
        const courses = await canvasClient.getCourses(enrollmentState);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(courses, null, 2),
            },
          ],
        };
      }

      case "get_course": {
        const courseId = args?.course_id as number;
        const course = await canvasClient.getCourse(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(course, null, 2),
            },
          ],
        };
      }

      case "list_assignments": {
        const courseId = args?.course_id as number;
        const assignments = await canvasClient.getAssignments(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(assignments, null, 2),
            },
          ],
        };
      }

      case "get_assignment": {
        const courseId = args?.course_id as number;
        const assignmentId = args?.assignment_id as number;
        const assignment = await canvasClient.getAssignment(courseId, assignmentId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(assignment, null, 2),
            },
          ],
        };
      }

      case "get_submission": {
        const courseId = args?.course_id as number;
        const assignmentId = args?.assignment_id as number;
        const submission = await canvasClient.getSubmission(courseId, assignmentId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(submission, null, 2),
            },
          ],
        };
      }

      case "submit_assignment": {
        const courseId = args?.course_id as number;
        const assignmentId = args?.assignment_id as number;
        const submissionType = args?.submission_type as string;
        const body = args?.body as string | undefined;
        const url = args?.url as string | undefined;
        const fileIds = args?.file_ids as number[] | undefined;

        const submission = await canvasClient.submitAssignment(courseId, assignmentId, {
          submission_type: submissionType,
          body,
          url,
          file_ids: fileIds,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(submission, null, 2),
            },
          ],
        };
      }

      case "list_conversations": {
        const scope =
          (args?.scope as "inbox" | "unread" | "starred" | "sent" | "archived") || "inbox";
        const conversations = await canvasClient.getConversations(scope);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversations, null, 2),
            },
          ],
        };
      }

      case "get_conversation": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.getConversation(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "create_conversation": {
        const recipients = args?.recipients as string[];
        const subject = args?.subject as string;
        const body = args?.body as string;
        const courseId = args?.course_id as number | undefined;
        const groupConversation = (args?.group_conversation as boolean) || false;

        const conversation = await canvasClient.createConversation(
          recipients,
          subject,
          body,
          courseId,
          groupConversation
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "reply_to_conversation": {
        const conversationId = args?.conversation_id as number;
        const body = args?.body as string;
        const conversation = await canvasClient.replyToConversation(conversationId, body);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "mark_conversation_read": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.markConversationAsRead(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "mark_conversation_unread": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.markConversationAsUnread(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "star_conversation": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.starConversation(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "unstar_conversation": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.unstarConversation(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "archive_conversation": {
        const conversationId = args?.conversation_id as number;
        const conversation = await canvasClient.archiveConversation(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(conversation, null, 2),
            },
          ],
        };
      }

      case "delete_conversation": {
        const conversationId = args?.conversation_id as number;
        const result = await canvasClient.deleteConversation(conversationId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "list_calendar_events": {
        const startDate = args?.start_date as string | undefined;
        const endDate = args?.end_date as string | undefined;
        const events = await canvasClient.getCalendarEvents(startDate, endDate);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(events, null, 2),
            },
          ],
        };
      }

      case "get_upcoming_assignments": {
        const events = await canvasClient.getUpcomingAssignments();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(events, null, 2),
            },
          ],
        };
      }

      case "get_course_grades": {
        const courseId = args?.course_id as number;
        const grades = await canvasClient.getGrades(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(grades, null, 2),
            },
          ],
        };
      }

      case "get_all_grades": {
        const allGrades = await canvasClient.getAllGrades();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(allGrades, null, 2),
            },
          ],
        };
      }

      case "list_todos": {
        const todos = await canvasClient.getAllTodos();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(todos, null, 2),
            },
          ],
        };
      }

      case "list_course_todos": {
        const courseId = args?.course_id as number;
        const todos = await canvasClient.getCourseTodos(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(todos, null, 2),
            },
          ],
        };
      }

      case "list_course_modules": {
        const courseId = args?.course_id as number;
        const modules = await canvasClient.getCourseModules(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(modules, null, 2),
            },
          ],
        };
      }

      case "list_announcements": {
        const courseId = args?.course_id as number | undefined;
        const announcements = await canvasClient.getAnnouncements(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(announcements, null, 2),
            },
          ],
        };
      }

      case "list_files": {
        const courseId = args?.course_id as number | undefined;
        const files = await canvasClient.getFiles(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(files, null, 2),
            },
          ],
        };
      }

      case "get_file": {
        const fileId = args?.file_id as number;
        const file = await canvasClient.downloadFile(fileId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(file, null, 2),
            },
          ],
        };
      }

      case "list_quizzes": {
        const courseId = args?.course_id as number;
        const quizzes = await canvasClient.getQuizzes(courseId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(quizzes, null, 2),
            },
          ],
        };
      }

      case "get_quiz_submission": {
        const courseId = args?.course_id as number;
        const quizId = args?.quiz_id as number;
        const submission = await canvasClient.getQuizSubmission(courseId, quizId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(submission, null, 2),
            },
          ],
        };
      }

      case "search_course_users": {
        const courseId = args?.course_id as number;
        const searchTerm = args?.search_term as string;
        const users = await canvasClient.searchUsers(courseId, searchTerm);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(users, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Canvas MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
