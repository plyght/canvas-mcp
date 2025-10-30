# Canvas MCP Server - Quick Start Guide

Get up and running with the Canvas MCP Server in 5 minutes.

## Prerequisites

- [Bun](https://bun.sh) installed on your system
- Canvas LMS account with API access
- MCP-compatible client (e.g., Claude Desktop)

## Step 1: Get Your Canvas API Token

1. Log into Canvas
2. Go to **Account** → **Settings**
3. Scroll to **Approved Integrations**
4. Click **+ New Access Token**
5. Enter a purpose description
6. Click **Generate Token**
7. **Copy the token immediately** (you won't see it again!)

## Step 2: Install Dependencies

```bash
cd /Users/nicojaffer/canvas
bun install
```

## Step 3: Configure Environment Variables

Create a `.env` file:

```bash
CANVAS_BASE_URL=https://your-institution.instructure.com
CANVAS_ACCESS_TOKEN=your_token_here
```

Replace:
- `your-institution.instructure.com` with your Canvas domain
- `your_token_here` with your actual API token

## Step 4: Test the Server

```bash
export CANVAS_BASE_URL="https://your-institution.instructure.com"
export CANVAS_ACCESS_TOKEN="your_token_here"
bun run dev
```

You should see: `Canvas MCP Server running on stdio`

Press `Ctrl+C` to stop.

## Step 5: Configure Your MCP Client

### For Claude Desktop

Edit your config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "canvas": {
      "command": "bun",
      "args": ["run", "/Users/nicojaffer/canvas/src/index.ts"],
      "env": {
        "CANVAS_BASE_URL": "https://your-institution.instructure.com",
        "CANVAS_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

Replace the values with your actual Canvas URL and token.

## Step 6: Restart Your MCP Client

Close and reopen Claude Desktop to load the Canvas MCP server.

## Step 7: Test It Out!

Try these commands in Claude:

```
Show me all my current courses
```

```
What assignments do I have due soon?
```

```
What are my grades in all my classes?
```

```
Show me my recent Canvas messages
```

## Verification

If everything is working, you should be able to:
- ✅ See your list of courses
- ✅ View upcoming assignments
- ✅ Check your grades
- ✅ Read your messages
- ✅ Access calendar events

## Troubleshooting

### "Authentication failed"
- Double-check your `CANVAS_ACCESS_TOKEN`
- Verify the token hasn't expired
- Make sure you copied the entire token

### "Connection error"
- Verify your `CANVAS_BASE_URL` is correct
- Don't include trailing slashes in the URL
- Test that you can access Canvas in a browser

### "Tool not found"
- Restart Claude Desktop completely
- Verify the config file path is correct
- Check that Bun is installed and in your PATH

### Server not starting
```bash
which bun
bun --version
```

Should show Bun is installed. If not, install from https://bun.sh

## Next Steps

- Read [Usage Guide](USAGE.md) for detailed usage examples
- Check [Tool Reference](TOOLS.md) for complete tool reference
- Review [Main README](../README.md) for architecture details

## Security Reminder

Never share your Canvas access token. Treat it like a password, avoid committing it to version control, rotate tokens regularly, and use token expiration dates.

## Getting Help

- Canvas API: https://canvas.instructure.com/doc/api/
- MCP Documentation: https://modelcontextprotocol.io/
- Canvas Developer Docs: https://developerdocs.instructure.com/

Ready to go. Start using your MCP client to interact with Canvas courses, assignments, and grades.

