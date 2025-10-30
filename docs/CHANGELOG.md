# Changelog

All notable changes to the Canvas MCP Server will be documented in this file.

## [1.1.0] - 2025-10-30

### Enhanced

#### Messaging & Conversations (6 new tools)

**Enhanced Existing Tools**
- `list_conversations` - Added `scope` parameter to filter by inbox, unread, starred, sent, or archived
- `get_conversation` - Now automatically marks conversation as read when viewed
- `create_conversation` - Added `group_conversation` parameter for group messaging

**New Conversation Management Tools**
- `mark_conversation_read` - Mark conversations as read
- `mark_conversation_unread` - Mark conversations as unread
- `star_conversation` - Star important conversations
- `unstar_conversation` - Remove star from conversations
- `archive_conversation` - Archive conversations
- `delete_conversation` - Permanently delete conversations

#### Documentation
- Updated TOOLS.md with new conversation management features
- Enhanced USAGE.md with conversation management examples
- Updated README to reflect 31 total tools (up from 25)
- Added comprehensive documentation for all conversation scopes and features

#### API Client Improvements
- Enhanced conversation filtering with scope support
- Added conversation state management (read/unread/archived)
- Added conversation starring functionality
- Added conversation deletion support
- Improved API parameter handling for group conversations
- Better alignment with Canvas API conversation endpoints

### Technical Details
- All quality gates pass (lint, typecheck, test, build)
- Maintained backward compatibility with existing tools
- Zero breaking changes to existing API
- Enhanced type safety for conversation operations

## [1.0.0] - 2025-10-30

### Added

#### Core Infrastructure
- TypeScript-based MCP server implementation
- Canvas LMS API client with comprehensive error handling
- Bun runtime support for fast execution
- Complete build and development tooling

#### MCP Tools (25 initial tools)

**User & Authentication**
- `get_current_user` - Retrieve current user profile

**Course Management**
- `list_courses` - List all enrolled courses with filtering
- `get_course` - Get detailed course information

**Assignment Operations**
- `list_assignments` - Browse course assignments
- `get_assignment` - View assignment details
- `get_submission` - Check submission status and grades
- `submit_assignment` - Submit work (text, URL, or files)

**Messaging System**
- `list_conversations` - View inbox messages
- `get_conversation` - Read conversation threads
- `create_conversation` - Send new messages
- `reply_to_conversation` - Reply to existing messages

**Calendar & Planning**
- `list_calendar_events` - View calendar events by date range
- `get_upcoming_assignments` - See upcoming due dates
- `list_todos` - View all to-do items
- `list_course_todos` - View course-specific todos

**Grade Tracking**
- `get_course_grades` - View grades for specific course
- `get_all_grades` - View grades across all courses

**Course Content**
- `list_course_modules` - Browse course modules and lessons
- `list_announcements` - Read course announcements
- `list_files` - Access course files
- `get_file` - Download file information

**Assessment Tools**
- `list_quizzes` - View course quizzes
- `get_quiz_submission` - Check quiz submissions

**Social Features**
- `search_course_users` - Find students and instructors

#### Documentation
- Comprehensive README with installation and setup
- Detailed USAGE guide with examples
- Complete TOOLS reference documentation
- Quick start guide for rapid setup
- Example MCP client configuration
- Security best practices guide

#### Development Tools
- ESLint configuration with TypeScript support
- Prettier code formatting
- TypeScript strict mode type checking
- Bun test framework integration
- Automated quality gate scripts

#### Features
- Full Canvas REST API v1 integration
- Authentication via Bearer token
- Rate limiting awareness
- Error handling and reporting
- Type-safe API client
- Extensible architecture
- Support for all major Canvas features

### Technical Details

**Dependencies**
- `@modelcontextprotocol/sdk` ^1.0.0 - MCP protocol implementation
- `axios` ^1.6.0 - HTTP client for Canvas API

**Development Dependencies**
- `typescript` ^5.6.0 - Type safety
- `eslint` ^9.0.0 - Code linting
- `prettier` ^3.3.0 - Code formatting
- `@types/node` ^22.0.0 - Node.js types
- `@types/bun` ^1.3.1 - Bun runtime types

**Quality Gates**
- Format checking with Prettier
- Linting with ESLint
- Type checking with TypeScript
- Unit testing with Bun test

**License Compliance**
- All dependencies use permissive licenses
- No telemetry or tracking
- No external data collection

### Security

- Environment variable-based configuration
- No hardcoded credentials
- Token-based authentication
- Secure API communication over HTTPS
- Rate limiting compliance
- Input validation and sanitization

### Performance

- Fast startup with Bun runtime
- Efficient API request handling
- Minimal memory footprint
- Optimized bundle size (~0.85 MB)
- Concurrent request support

### Compatibility

**Supported Canvas Versions**
- Canvas LMS with REST API v1
- Instructure Canvas (cloud and self-hosted)
- All Canvas-compatible LMS platforms

**Supported MCP Clients**
- Claude Desktop
- Any MCP-compatible client
- Standard MCP protocol compliance

**Runtime Requirements**
- Node.js 18+ or Bun 1.0+
- macOS, Linux, or Windows
- Network access to Canvas instance

## Future Roadmap

### Planned Features
- Assignment upload with file handling
- Bulk operations support
- Advanced filtering and search
- Notification subscriptions
- Real-time updates via webhooks
- Discussion board integration
- Rubric assessment details
- Peer review features
- Group management
- Student analytics

### Under Consideration
- GraphQL support
- Caching layer for performance
- Offline mode support
- Multi-tenant support
- Plugin architecture
- Custom tool extensions

## Contributing

Contributions are welcome! Please ensure:
- All quality gates pass
- Tests cover new features
- Documentation is updated
- No new external dependencies without discussion
- Security best practices followed

## Support

For issues, questions, or feature requests:
- Canvas API: https://canvas.instructure.com/doc/api/
- MCP Documentation: https://modelcontextprotocol.io/
- Instructure Developers: https://developerdocs.instructure.com/

