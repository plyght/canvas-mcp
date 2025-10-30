# Canvas MCP Server

A Model Context Protocol server providing comprehensive access to Canvas LMS for AI assistants.

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=canvas&config=eyJjb21tYW5kIjoiYnVuIiwiYXJncyI6WyJydW4iLCIvYWJzb2x1dGUvcGF0aC90by9jYW52YXMvc3JjL2luZGV4LnRzIl0sImVudiI6eyJDQU5WQVNfQkFTRV9VUkwiOiJodHRwczovL3lvdXItaW5zdGl0dXRpb24uaW5zdHJ1Y3R1cmUuY29tIiwiQ0FOVkFTX0FDQ0VTU19UT0tFTiI6InlvdXJfYWNjZXNzX3Rva2VuX2hlcmUifX0%3D)

## Features

Access Canvas LMS functionality through 31 MCP tools:

- **Courses**: List and view course information
- **Assignments**: Browse, view details, check submissions, and submit work
- **Grades**: View grades for individual courses or across all courses
- **Messaging**: Send and receive messages, manage conversations (read/unread, star, archive, delete)
- **Calendar**: View events and upcoming deadlines
- **To-Do Lists**: Track pending tasks and assignments
- **Modules**: Navigate course content structure
- **Announcements**: Read course and institutional announcements
- **Files**: Access and download course materials
- **Quizzes**: View quizzes and submissions
- **Users**: Search for classmates and instructors

## Installation

### Prerequisites

- [Bun](https://bun.sh) runtime
- Canvas LMS account with API access token

### Setup

1. Install dependencies:
```bash
bun install
```

2. Get your Canvas API token:
   - Log into Canvas
   - Navigate to Account → Settings
   - Scroll to "Approved Integrations"
   - Click "+ New Access Token"
   - Generate and copy the token

3. Configure environment variables:
```bash
export CANVAS_BASE_URL="https://your-institution.instructure.com"
export CANVAS_ACCESS_TOKEN="your_access_token_here"
```

4. Configure your MCP client with the following settings:
```json
{
  "mcpServers": {
    "canvas": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/canvas/src/index.ts"],
      "env": {
        "CANVAS_BASE_URL": "https://your-institution.instructure.com",
        "CANVAS_ACCESS_TOKEN": "your_access_token_here"
      }
    }
  }
}
```

## Usage

After setup, interact with Canvas through your MCP client:

```
Show me all my current courses
What assignments do I have due soon?
What are my grades in all my classes?
Show me my recent Canvas messages
```

## Development

### Quality Gates

```bash
bun run format      # Format code with Prettier
bun run lint        # Lint code with ESLint
bun run typecheck   # Type check with TypeScript
bun test            # Run tests
```

### Build

```bash
bun run build       # Build for production
bun run dev         # Run in development mode
```

## Documentation

- [Quick Start Guide](docs/QUICKSTART.md)
- [Usage Examples](docs/USAGE.md)
- [Tool Reference](docs/TOOLS.md)
- [Changelog](docs/CHANGELOG.md)

## Architecture

Built with TypeScript and the MCP SDK, this server provides a type-safe interface to the Canvas LMS REST API. All operations use Bearer token authentication and respect Canvas rate limits.

### Project Structure

```
canvas/
├── src/
│   ├── canvas/
│   │   ├── client.ts        # Canvas API client
│   │   └── client.test.ts   # Client tests
│   └── index.ts             # MCP server implementation
├── docs/                    # Documentation
├── package.json             # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Security

- Store credentials in environment variables
- Never commit access tokens to version control
- Use token expiration dates
- Rotate tokens regularly
- Follow your institution's API usage policies

## API Reference

This server implements the [Canvas LMS REST API v1](https://canvas.instructure.com/doc/api/). For detailed API documentation, visit the [Instructure Developer Portal](https://developerdocs.instructure.com/).

## License

This project uses permissive open-source dependencies with no telemetry or tracking.
