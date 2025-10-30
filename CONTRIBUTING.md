# Contributing to Canvas MCP Server

Contributions are welcome. Please follow these guidelines to maintain code quality and consistency.

## Development Setup

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables:
```bash
export CANVAS_BASE_URL="https://your-institution.instructure.com"
export CANVAS_ACCESS_TOKEN="your_access_token_here"
```

## Code Standards

### Quality Gates

All changes must pass the following checks:

```bash
bun run format      # Prettier formatting
bun run lint        # ESLint checks
bun run typecheck   # TypeScript type checking
bun test            # Test suite
```

Run all checks before committing:
```bash
bun run format && bun run lint && bun run typecheck && bun test
```

### Code Style

- Use TypeScript strict mode
- Follow existing code patterns
- Preserve all existing comments verbatim
- No new comments, headers, or placeholder text
- Use Bun exclusively for JavaScript/TypeScript operations
- Never use npm, yarn, or pnpm

### Repository Rules

- Inspect manifests before editing
- Verify tasks for formatting, linting, type-checking, and testing
- After editing, ensure all quality gates run cleanly
- Add dependencies only with permissive licenses and no telemetry
- Do not embed secrets, API keys, or credentials
- Never stage, commit, or push automatically

## Testing

Add tests for new features:

```typescript
import { describe, test, expect } from "bun:test";

describe("New Feature", () => {
  test("should work correctly", () => {
    expect(true).toBe(true);
  });
});
```

## Documentation

Update documentation when adding features:

- `README.md` - High-level overview and setup
- `docs/TOOLS.md` - Tool reference for new tools
- `docs/USAGE.md` - Usage examples
- `docs/CHANGELOG.md` - Version history

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run all quality gates
5. Update documentation
6. Submit pull request

## Canvas API Guidelines

When adding new Canvas API functionality:

- Use the Canvas REST API v1
- Add proper TypeScript types
- Implement error handling
- Respect rate limits
- Follow Canvas API best practices
- Document API endpoints used

## Security

- Never commit credentials or tokens
- Use environment variables for configuration
- Validate all user inputs
- Follow secure coding practices
- Report security issues privately

## License

By contributing, you agree that your contributions will use the same permissive license as the project.

