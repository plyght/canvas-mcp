import axios, { AxiosInstance } from "axios";

export interface CanvasConfig {
  baseUrl: string;
  accessToken: string;
}

export interface Course {
  id: number;
  name: string;
  course_code: string;
  workflow_state: string;
  enrollment_term_id?: number;
  start_at?: string;
  end_at?: string;
}

export interface Assignment {
  id: number;
  name: string;
  description: string;
  due_at?: string;
  points_possible?: number;
  submission_types: string[];
  course_id: number;
  html_url: string;
}

export interface Submission {
  id: number;
  assignment_id: number;
  user_id: number;
  grade?: string;
  score?: number;
  submitted_at?: string;
  workflow_state: string;
  late: boolean;
}

export interface Conversation {
  id: number;
  subject: string;
  workflow_state: string;
  last_message: string;
  last_message_at: string;
  message_count: number;
  participants: Array<{
    id: number;
    name: string;
    avatar_url?: string;
  }>;
}

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  start_at: string;
  end_at?: string;
  all_day: boolean;
  context_code: string;
  html_url: string;
}

export interface GradingPeriod {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  type: string;
  role: string;
  enrollment_state: string;
  grades?: {
    current_score?: number;
    current_grade?: string;
    final_score?: number;
    final_grade?: string;
  };
}

export class CanvasClient {
  private client: AxiosInstance;
  private config: CanvasConfig;

  constructor(config: CanvasConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  async getCurrentUser() {
    const response = await this.client.get("/api/v1/users/self");
    return response.data;
  }

  async getCourses(enrollmentState = "active") {
    const response = await this.client.get<Course[]>("/api/v1/courses", {
      params: {
        enrollment_state: enrollmentState,
        include: ["term", "total_scores"],
      },
    });
    return response.data;
  }

  async getCourse(courseId: number) {
    const response = await this.client.get<Course>(`/api/v1/courses/${courseId}`);
    return response.data;
  }

  async getAssignments(courseId: number) {
    const response = await this.client.get<Assignment[]>(
      `/api/v1/courses/${courseId}/assignments`,
      {
        params: {
          per_page: 100,
        },
      }
    );
    return response.data;
  }

  async getAssignment(courseId: number, assignmentId: number) {
    const response = await this.client.get<Assignment>(
      `/api/v1/courses/${courseId}/assignments/${assignmentId}`
    );
    return response.data;
  }

  async getSubmission(courseId: number, assignmentId: number) {
    const response = await this.client.get<Submission>(
      `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions/self`,
      {
        params: {
          include: ["submission_comments", "rubric_assessment"],
        },
      }
    );
    return response.data;
  }

  async submitAssignment(
    courseId: number,
    assignmentId: number,
    submissionData: {
      submission_type: string;
      body?: string;
      url?: string;
      file_ids?: number[];
    }
  ) {
    const response = await this.client.post(
      `/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions`,
      { submission: submissionData }
    );
    return response.data;
  }

  async getConversations(scope: "inbox" | "unread" | "starred" | "sent" | "archived" = "inbox") {
    const response = await this.client.get<Conversation[]>("/api/v1/conversations", {
      params: {
        scope,
        per_page: 50,
        include_all_conversation_ids: false,
      },
    });
    return response.data;
  }

  async getConversation(conversationId: number) {
    const response = await this.client.get(`/api/v1/conversations/${conversationId}`, {
      params: {
        auto_mark_as_read: true,
      },
    });
    return response.data;
  }

  async createConversation(
    recipients: string[],
    subject: string,
    body: string,
    courseId?: number,
    groupConversation: boolean = false
  ) {
    const response = await this.client.post("/api/v1/conversations", {
      recipients,
      subject,
      body,
      context_code: courseId ? `course_${courseId}` : undefined,
      group_conversation: groupConversation,
      force_new: true,
    });
    return response.data;
  }

  async replyToConversation(conversationId: number, body: string) {
    const response = await this.client.post(`/api/v1/conversations/${conversationId}/add_message`, {
      body,
    });
    return response.data;
  }

  async markConversationAsRead(conversationId: number) {
    const response = await this.client.put(`/api/v1/conversations/${conversationId}`, {
      conversation: {
        workflow_state: "read",
      },
    });
    return response.data;
  }

  async markConversationAsUnread(conversationId: number) {
    const response = await this.client.put(`/api/v1/conversations/${conversationId}`, {
      conversation: {
        workflow_state: "unread",
      },
    });
    return response.data;
  }

  async starConversation(conversationId: number) {
    const response = await this.client.put(`/api/v1/conversations/${conversationId}`, {
      conversation: {
        starred: true,
      },
    });
    return response.data;
  }

  async unstarConversation(conversationId: number) {
    const response = await this.client.put(`/api/v1/conversations/${conversationId}`, {
      conversation: {
        starred: false,
      },
    });
    return response.data;
  }

  async archiveConversation(conversationId: number) {
    const response = await this.client.put(`/api/v1/conversations/${conversationId}`, {
      conversation: {
        workflow_state: "archived",
      },
    });
    return response.data;
  }

  async deleteConversation(conversationId: number) {
    const response = await this.client.delete(`/api/v1/conversations/${conversationId}`);
    return response.data;
  }

  async getCalendarEvents(startDate?: string, endDate?: string) {
    const response = await this.client.get<CalendarEvent[]>("/api/v1/calendar_events", {
      params: {
        type: "event",
        start_date: startDate,
        end_date: endDate,
        per_page: 100,
      },
    });
    return response.data;
  }

  async getUpcomingAssignments() {
    const response = await this.client.get("/api/v1/users/self/upcoming_events");
    return response.data;
  }

  async getGrades(courseId: number) {
    const response = await this.client.get<Enrollment[]>(
      `/api/v1/courses/${courseId}/enrollments`,
      {
        params: {
          user_id: "self",
          type: ["StudentEnrollment"],
          include: ["current_grading_period_scores"],
        },
      }
    );
    return response.data;
  }

  async getAllGrades() {
    const courses = await this.getCourses();
    const gradesPromises = courses.map(async (course) => {
      try {
        const grades = await this.getGrades(course.id);
        return {
          course,
          grades: grades[0]?.grades || {},
        };
      } catch {
        return {
          course,
          grades: {},
        };
      }
    });
    return Promise.all(gradesPromises);
  }

  async getCourseTodos(courseId: number) {
    const response = await this.client.get(`/api/v1/courses/${courseId}/todo`);
    return response.data;
  }

  async getAllTodos() {
    const response = await this.client.get("/api/v1/users/self/todo");
    return response.data;
  }

  async getCourseModules(courseId: number) {
    const response = await this.client.get(`/api/v1/courses/${courseId}/modules`, {
      params: {
        include: ["items"],
        per_page: 100,
      },
    });
    return response.data;
  }

  async getAnnouncements(courseId?: number) {
    const contextCodes = courseId ? [`course_${courseId}`] : undefined;
    const response = await this.client.get("/api/v1/announcements", {
      params: {
        context_codes: contextCodes,
        per_page: 50,
      },
    });
    return response.data;
  }

  async getFiles(courseId?: number) {
    const endpoint = courseId ? `/api/v1/courses/${courseId}/files` : "/api/v1/users/self/files";
    const response = await this.client.get(endpoint, {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  }

  async downloadFile(fileId: number) {
    const response = await this.client.get(`/api/v1/files/${fileId}`);
    return response.data;
  }

  async getQuizzes(courseId: number) {
    const response = await this.client.get(`/api/v1/courses/${courseId}/quizzes`, {
      params: {
        per_page: 100,
      },
    });
    return response.data;
  }

  async getQuizSubmission(courseId: number, quizId: number) {
    const response = await this.client.get(
      `/api/v1/courses/${courseId}/quizzes/${quizId}/submissions/self`
    );
    return response.data;
  }

  async searchUsers(courseId: number, searchTerm: string) {
    const response = await this.client.get(`/api/v1/courses/${courseId}/users`, {
      params: {
        search_term: searchTerm,
        per_page: 50,
      },
    });
    return response.data;
  }
}
