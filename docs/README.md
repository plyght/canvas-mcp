# Canvas MCP Server Documentation

Complete documentation for the Canvas MCP Server.

## Getting Started

- [Quick Start Guide](QUICKSTART.md) - Get up and running in 5 minutes
- [Installation](../README.md#installation) - Detailed installation instructions

## Usage

- [Usage Guide](USAGE.md) - Comprehensive usage examples and common scenarios
- [Tool Reference](TOOLS.md) - Complete reference for all 25 MCP tools
- [Configuration Example](mcp-config-example.json) - Sample MCP client configuration

## Reference

- [Changelog](CHANGELOG.md) - Version history and roadmap
- [Canvas API Documentation](https://canvas.instructure.com/doc/api/) - Official Canvas API docs
- [MCP Documentation](https://modelcontextprotocol.io/) - Model Context Protocol specification

## Support

For issues or questions:
- Canvas API: https://canvas.instructure.com/doc/api/
- Instructure Developer Portal: https://developerdocs.instructure.com/
- MCP Protocol: https://modelcontextprotocol.io/

## Quick Reference

### Available Tools

**User & Courses**
- `get_current_user` - Current user profile
- `list_courses` - List enrolled courses
- `get_course` - Course details

**Assignments**
- `list_assignments` - Course assignments
- `get_assignment` - Assignment details
- `get_submission` - Submission status
- `submit_assignment` - Submit work

**Messaging**
- `list_conversations` - Inbox messages
- `get_conversation` - Conversation details
- `create_conversation` - Send message
- `reply_to_conversation` - Reply to message

**Calendar & Planning**
- `list_calendar_events` - Calendar events
- `get_upcoming_assignments` - Upcoming deadlines
- `list_todos` - All to-do items
- `list_course_todos` - Course to-dos

**Grades**
- `get_course_grades` - Course grades
- `get_all_grades` - All grades

**Content**
- `list_course_modules` - Course modules
- `list_announcements` - Announcements
- `list_files` - Course files
- `get_file` - File details

**Assessments**
- `list_quizzes` - Course quizzes
- `get_quiz_submission` - Quiz submission

**Social**
- `search_course_users` - Find users

## Security Best Practices

1. Never commit access tokens to version control
2. Use environment variables for credentials
3. Set token expiration dates
4. Rotate tokens regularly
5. Follow institutional API policies
6. Limit token scope when possible

