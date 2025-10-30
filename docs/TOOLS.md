# Canvas MCP Server - Complete Tool Reference

## Overview

This document provides detailed information about all 25 tools available in the Canvas MCP Server.

## User & Authentication

### get_current_user

Get information about the currently authenticated user.

**Parameters:** None

**Returns:** User object with profile information

**Example Usage:**
```
Get my Canvas user information
```

**Response includes:**
- User ID
- Name
- Email
- Avatar URL
- Login credentials
- Locale

---

## Courses

### list_courses

List all courses for the current user.

**Parameters:**
- `enrollment_state` (optional, string) - Filter by enrollment state
  - Default: `"active"`
  - Options: `"active"`, `"completed"`, `"invited"`, `"rejected"`

**Returns:** Array of course objects

**Example Usage:**
```
Show me all my active courses
List all my completed courses
```

**Response includes per course:**
- Course ID
- Name
- Course code
- Workflow state
- Term information
- Start/end dates

### get_course

Get detailed information about a specific course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Course object with detailed information

**Example Usage:**
```
Get details for course 12345
```

---

## Assignments

### list_assignments

List all assignments for a specific course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Array of assignment objects

**Example Usage:**
```
Show me all assignments for course 12345
List homework in my Math class (course 6789)
```

**Response includes per assignment:**
- Assignment ID
- Name
- Description (HTML)
- Due date
- Points possible
- Submission types
- HTML URL

### get_assignment

Get detailed information about a specific assignment.

**Parameters:**
- `course_id` (required, number) - The ID of the course
- `assignment_id` (required, number) - The ID of the assignment

**Returns:** Assignment object with full details

**Example Usage:**
```
Get details for assignment 5678 in course 1234
```

### get_submission

Get submission details for an assignment, including grade and status.

**Parameters:**
- `course_id` (required, number) - The ID of the course
- `assignment_id` (required, number) - The ID of the assignment

**Returns:** Submission object with grade information

**Example Usage:**
```
Check my submission for assignment 5678 in course 1234
What grade did I get on assignment 5678?
```

**Response includes:**
- Submission ID
- Grade/Score
- Submission date
- Workflow state
- Late status
- Comments
- Rubric assessment

### submit_assignment

Submit work for an assignment.

**Parameters:**
- `course_id` (required, number) - The ID of the course
- `assignment_id` (required, number) - The ID of the assignment
- `submission_type` (required, string) - Type of submission
  - `"online_text_entry"` - Text submission
  - `"online_url"` - URL submission
  - `"online_upload"` - File upload
- `body` (optional, string) - Text content for text entries
- `url` (optional, string) - URL for URL submissions
- `file_ids` (optional, array of numbers) - File IDs for uploads

**Returns:** Submission confirmation

**Example Usage:**
```
Submit text "My essay content here" for assignment 5678 in course 1234
Submit URL "https://example.com/project" for assignment 5678
```

---

## Messaging & Conversations

### list_conversations

List all conversations (messages) in the user's inbox.

**Parameters:** None

**Returns:** Array of conversation objects

**Example Usage:**
```
Show me my Canvas messages
List my inbox conversations
```

**Response includes per conversation:**
- Conversation ID
- Subject
- Workflow state
- Last message preview
- Message count
- Participants

### get_conversation

Get full details about a specific conversation thread.

**Parameters:**
- `conversation_id` (required, number) - The ID of the conversation

**Returns:** Conversation object with all messages

**Example Usage:**
```
Show conversation 9876
Get details of message thread 9876
```

### create_conversation

Create a new conversation (send a message).

**Parameters:**
- `recipients` (required, array of strings) - Recipient user IDs
  - Format: `["user_123", "user_456"]`
- `subject` (required, string) - Message subject
- `body` (required, string) - Message body
- `course_id` (optional, number) - Course to associate with

**Returns:** Created conversation object

**Example Usage:**
```
Send a message to user_123 with subject "Question" and body "Can you help?"
Create conversation with user_456 about homework
```

### reply_to_conversation

Reply to an existing conversation.

**Parameters:**
- `conversation_id` (required, number) - The conversation to reply to
- `body` (required, string) - Reply message content

**Returns:** Updated conversation object

**Example Usage:**
```
Reply to conversation 9876 with "Thank you!"
```

---

## Calendar & Planning

### list_calendar_events

List calendar events within a date range.

**Parameters:**
- `start_date` (optional, string) - Start date (ISO 8601 format)
- `end_date` (optional, string) - End date (ISO 8601 format)

**Returns:** Array of calendar event objects

**Example Usage:**
```
Show calendar events from 2024-10-01 to 2024-10-31
List events this week
```

**Response includes per event:**
- Event ID
- Title
- Description
- Start/end dates
- All-day flag
- Context code
- HTML URL

### get_upcoming_assignments

Get upcoming assignments and events.

**Parameters:** None

**Returns:** Array of upcoming event objects

**Example Usage:**
```
What's due soon?
Show my upcoming assignments
```

### list_todos

List all todo items across all courses.

**Parameters:** None

**Returns:** Array of todo items

**Example Usage:**
```
Show my Canvas to-do list
What tasks do I need to complete?
```

### list_course_todos

List todo items for a specific course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Array of course-specific todo items

**Example Usage:**
```
Show todos for course 1234
What do I need to do for my Math class?
```

---

## Grades

### get_course_grades

Get grades for a specific course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Enrollment object with grade information

**Example Usage:**
```
What's my grade in course 1234?
Show grades for my English class
```

**Response includes:**
- Current score
- Current grade
- Final score
- Final grade
- Grading period scores

### get_all_grades

Get grades for all enrolled courses.

**Parameters:** None

**Returns:** Array of course/grade pairs

**Example Usage:**
```
Show all my grades
What are my current grades in all classes?
```

---

## Course Content

### list_course_modules

List all modules in a course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Array of module objects with items

**Example Usage:**
```
Show modules for course 1234
List all content in my History class
```

**Response includes per module:**
- Module ID
- Name
- Position
- Items (lessons, assignments, etc.)
- Completion requirements

### list_announcements

List course announcements.

**Parameters:**
- `course_id` (optional, number) - Filter by course ID

**Returns:** Array of announcement objects

**Example Usage:**
```
Show all announcements
List announcements for course 1234
```

**Response includes per announcement:**
- Title
- Message
- Posted date
- Author
- Context

---

## Files

### list_files

List files available to the user.

**Parameters:**
- `course_id` (optional, number) - Filter by course ID

**Returns:** Array of file objects

**Example Usage:**
```
Show all my files
List files in course 1234
```

**Response includes per file:**
- File ID
- Display name
- Filename
- Content type
- Size
- Created/modified dates
- URL

### get_file

Get detailed information about a specific file.

**Parameters:**
- `file_id` (required, number) - The ID of the file

**Returns:** File object with download URL

**Example Usage:**
```
Get file 5678
Show details for file 5678
```

---

## Quizzes

### list_quizzes

List all quizzes in a course.

**Parameters:**
- `course_id` (required, number) - The ID of the course

**Returns:** Array of quiz objects

**Example Usage:**
```
Show quizzes for course 1234
List all tests in my Science class
```

**Response includes per quiz:**
- Quiz ID
- Title
- Description
- Quiz type
- Time limit
- Question count
- Points possible
- Due date

### get_quiz_submission

Get submission details for a quiz.

**Parameters:**
- `course_id` (required, number) - The ID of the course
- `quiz_id` (required, number) - The ID of the quiz

**Returns:** Quiz submission object

**Example Usage:**
```
Show my submission for quiz 9876 in course 1234
```

**Response includes:**
- Submission ID
- Attempt number
- Score
- Started/finished times
- Workflow state

---

## Social Features

### search_course_users

Search for users within a course.

**Parameters:**
- `course_id` (required, number) - The ID of the course
- `search_term` (required, string) - Name or email to search

**Returns:** Array of user objects

**Example Usage:**
```
Find users named "John" in course 1234
Search for "jane@example.com" in my Math class
```

**Response includes per user:**
- User ID
- Name
- Login ID
- Avatar URL
- Enrollments

---

## Best Practices

### Error Handling

All tools return error information if requests fail:
- Authentication errors (401)
- Permission errors (403)
- Not found errors (404)
- Rate limit errors (429)
- Server errors (500+)

### Rate Limiting

Canvas APIs enforce rate limits:
- Default: 3000 requests per hour per token
- Some endpoints have stricter limits
- Responses include rate limit headers

### Data Freshness

- Most data is real-time from Canvas
- Some cached data may have slight delays
- Grades update after instructor posts them
- Calendar events sync from course schedules

### Parameter Formats

- **Course IDs**: Numeric, found in Canvas URLs or from `list_courses`
- **Assignment IDs**: Numeric, found in URLs or from `list_assignments`
- **User IDs**: String format `user_123` for API calls
- **Dates**: ISO 8601 format `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`

### Permissions

Available features depend on your Canvas role:
- **Students**: Most read operations, limited write (submissions, messages)
- **Teachers**: Additional grading and content management
- **Admins**: Full access depending on token scope

Check with your Canvas administrator if you lack expected permissions.

