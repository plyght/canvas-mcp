# Canvas MCP Server Usage Guide

## Quick Start

### 1. Get Your Canvas API Token

1. Log into your Canvas LMS instance
2. Click on **Account** in the left sidebar
3. Click on **Settings**
4. Scroll down to **Approved Integrations**
5. Click **+ New Access Token**
6. Give it a purpose like "MCP Server Access"
7. Set an expiration date (optional)
8. Click **Generate Token**
9. **Copy the token immediately** - you won't be able to see it again!

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
CANVAS_BASE_URL=https://your-institution.instructure.com
CANVAS_ACCESS_TOKEN=your_token_here
```

Or export them in your shell:

```bash
export CANVAS_BASE_URL="https://your-institution.instructure.com"
export CANVAS_ACCESS_TOKEN="your_token_here"
```

### 3. Configure Your MCP Client

For **Claude Desktop**, edit your config file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "canvas": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/canvas/src/index.ts"],
      "env": {
        "CANVAS_BASE_URL": "https://your-institution.instructure.com",
        "CANVAS_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### 4. Restart Your MCP Client

Close and reopen Claude Desktop (or your MCP client) to load the new server.

## Common Use Cases

### Check Your Courses

```
Show me all my current courses
```

The MCP server will use the `list_courses` tool to fetch your enrolled courses.

### View Upcoming Assignments

```
What assignments do I have due soon?
```

Uses `get_upcoming_assignments` to show deadlines.

### Check Grades

```
What are my grades in all my classes?
```

Uses `get_all_grades` to display your current grades across all courses.

### View Assignment Details

```
Show me the details for assignment 12345 in course 6789
```

Uses `get_assignment` to retrieve specific assignment information.

### Check Assignment Submission Status

```
Did I submit assignment 12345 in course 6789?
```

Uses `get_submission` to check submission status and grade.

### Read Messages

```
Show me my recent Canvas messages
Show unread messages
List starred conversations
```

Uses `list_conversations` with optional scope parameter to display your inbox.

### Send a Message

```
Send a message to user_123 with the subject "Question about homework" 
and body "Can you clarify the requirements for the essay?"
```

Uses `create_conversation` to send messages.

### Manage Conversations

```
Mark conversation 123 as read
Star conversation 456
Archive conversation 789
Delete conversation 999
```

Uses various conversation management tools to organize your inbox.

### View Calendar

```
What events do I have on my Canvas calendar this week?
```

Uses `list_calendar_events` with date range parameters.

### Browse Course Modules

```
Show me all the modules in course 6789
```

Uses `list_course_modules` to display course content structure.

### Check Announcements

```
Are there any new announcements in my Math course?
```

Uses `list_announcements` filtered by course.

### View Files

```
List all files in course 6789
```

Uses `list_files` to show available course files.

### Find Classmates

```
Find users with the name "John" in course 6789
```

Uses `search_course_users` to locate people in your course.

## All Available Tools

### User & Courses
- `get_current_user` - Your profile information
- `list_courses` - All enrolled courses
- `get_course` - Specific course details

### Assignments
- `list_assignments` - All assignments in a course
- `get_assignment` - Assignment details
- `get_submission` - Submission status and grade
- `submit_assignment` - Submit work (text, URL, or files)

### Messaging
- `list_conversations` - Inbox messages (supports filtering by scope)
- `get_conversation` - Message thread details (auto-marks as read)
- `create_conversation` - Send new message (supports group conversations)
- `reply_to_conversation` - Reply to existing message
- `mark_conversation_read` - Mark message as read
- `mark_conversation_unread` - Mark message as unread
- `star_conversation` - Star important messages
- `unstar_conversation` - Remove star from messages
- `archive_conversation` - Archive messages
- `delete_conversation` - Delete messages permanently

### Calendar & Planning
- `list_calendar_events` - Calendar events in date range
- `get_upcoming_assignments` - Due dates coming up
- `list_todos` - All to-do items
- `list_course_todos` - To-dos for specific course

### Grades
- `get_course_grades` - Grades for one course
- `get_all_grades` - Grades across all courses

### Content
- `list_course_modules` - Course module structure
- `list_announcements` - Course announcements
- `list_files` - Course files
- `get_file` - File information
- `list_quizzes` - Course quizzes
- `get_quiz_submission` - Quiz submission details

### Social
- `search_course_users` - Find people in a course

## Tips

1. **Course IDs**: Course IDs are numeric and can be found in Canvas URLs or by listing courses first
2. **Assignment IDs**: Assignment IDs are also numeric and found in URLs or by listing assignments
3. **User IDs**: When sending messages, user IDs should be formatted as `user_123` where 123 is the user's numeric ID
4. **Date Formats**: Use ISO 8601 format for dates: `2024-10-30` or `2024-10-30T14:30:00Z`
5. **Submission Types**: Valid submission types are:
   - `online_text_entry` - Text submission (provide `body` parameter)
   - `online_url` - URL submission (provide `url` parameter)
   - `online_upload` - File submission (provide `file_ids` array)

## Troubleshooting

### "Authentication failed" or 401 errors
- Check that your `CANVAS_ACCESS_TOKEN` is correct
- Verify the token hasn't expired
- Make sure you copied the entire token

### "Invalid base URL" or connection errors
- Verify your `CANVAS_BASE_URL` is correct
- Don't include trailing slashes in the URL
- Make sure your Canvas instance is accessible

### "Permission denied" errors
- Some features require specific Canvas permissions
- Check your user role (student, teacher, admin)
- Contact your Canvas administrator if needed

### Rate limiting
- Canvas APIs have rate limits
- If you get rate limit errors, slow down requests
- Typically 3000 requests per hour per token

### Tool not found
- Restart your MCP client
- Verify the configuration is correct
- Check that the server process is running

## Security Best Practices

1. **Never share your access token** - treat it like a password
2. **Don't commit tokens to git** - use environment variables
3. **Use token expiration** - set reasonable expiration dates
4. **Rotate tokens regularly** - create new tokens periodically
5. **Revoke unused tokens** - remove old tokens from Canvas settings
6. **Limit token scope** - use purpose-specific tokens when possible

## Advanced Usage

### Custom Canvas Instance
If your institution uses a custom Canvas domain:

```bash
export CANVAS_BASE_URL="https://custom-canvas-domain.edu"
```

### Multiple Canvas Accounts
You can configure multiple Canvas instances:

```json
{
  "mcpServers": {
    "canvas-school": {
      "command": "bun",
      "args": ["run", "/path/to/canvas/src/index.ts"],
      "env": {
        "CANVAS_BASE_URL": "https://school.instructure.com",
        "CANVAS_ACCESS_TOKEN": "token1"
      }
    },
    "canvas-work": {
      "command": "bun",
      "args": ["run", "/path/to/canvas/src/index.ts"],
      "env": {
        "CANVAS_BASE_URL": "https://work.instructure.com",
        "CANVAS_ACCESS_TOKEN": "token2"
      }
    }
  }
}
```

### Testing the Server
Test the server directly:

```bash
cd /Users/nicojaffer/canvas
export CANVAS_BASE_URL="https://your-institution.instructure.com"
export CANVAS_ACCESS_TOKEN="your_token"
bun run dev
```

The server will start and listen for MCP requests on stdio.

## Support

For Canvas API documentation:
- [Canvas LMS REST API](https://canvas.instructure.com/doc/api/)
- [Instructure Developer Docs](https://developerdocs.instructure.com/)

For MCP documentation:
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Getting Started](https://modelcontextprotocol.io/docs/getting-started/intro)

