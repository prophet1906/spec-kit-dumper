# Spec-Kit Dumper

A CLI tool to set up Kilocode or Clinerules for Spec-Driven Development workflows in any project workspace.

## Installation

Install globally using npm:

```bash
npm install -g spec-kit-dumper
```

## Usage

### Interactive Setup

The easiest way to get started is with the interactive setup:

```bash
spec-kit init
```

This will guide you through choosing between Kilocode or Clinerules setup.

### Direct Commands

#### Kilocode Setup

Set up Kilocode custom modes for Spec-Driven Development:

```bash
spec-kit kilocode
```

This copies the following to your current directory:
- `memory/` - Constitutional memory and update checklists
- `modes/` - Specify, Plan, and Tasks mode definitions
- `scripts/` - Shell scripts for feature management
- `templates/` - Specification and planning templates
- `.kilocodemodes` - Kilocode configuration file

#### Clinerules Setup

Set up Clinerules for Spec-Driven Development with Cline AI:

```bash
spec-kit clinerules
```

This copies the following to your current directory:
- `memory/` - Constitutional memory and update checklists
- `modes/` - Specify, Plan, and Tasks mode definitions
- `scripts/` - Shell scripts for feature management
- `templates/` - Specification and planning templates
- `.clinerules/spec-kit.md` - Clinerules configuration for slash commands

### Options

Both commands support these options:

- `--force` or `-f`: Overwrite existing files without confirmation
- `--verbose` or `-v`: Show detailed output during setup

Examples:
```bash
spec-kit kilocode --force --verbose
spec-kit clinerules -f -v
```

### Status Check

Check what's currently set up in your workspace:

```bash
spec-kit status
```

## What Gets Installed

### Common Files (Both Setups)

#### Memory Directory
- `memory/constitution.md` - Core principles and guidelines
- `memory/constitution_update_checklist.md` - Update procedures

#### Modes Directory
- `modes/specify.md` - Feature specification mode
- `modes/plan.md` - Implementation planning mode
- `modes/tasks.md` - Task breakdown mode

#### Scripts Directory
- `scripts/create-new-feature.sh` - Create feature branches and specs
- `scripts/setup-plan.sh` - Set up implementation planning
- `scripts/check-task-prerequisites.sh` - Validate task requirements
- `scripts/get-feature-paths.sh` - Get feature file paths
- `scripts/update-agent-context.sh` - Update agent context
- `scripts/common.sh` - Common utility functions

#### Templates Directory
- `templates/spec-template.md` - Feature specification template
- `templates/plan-template.md` - Implementation plan template
- `templates/tasks-template.md` - Task breakdown template
- `templates/agent-file-template.md` - Agent file template

### Kilocode-Specific Files

- `.kilocodemodes` - Defines custom modes for Kilocode workspace

### Clinerules-Specific Files

- `.clinerules/spec-kit.md` - Slash command delegation rules for Cline AI

## Spec-Driven Development Workflow

This tool sets up a complete Spec-Driven Development workflow with three phases:

### 1. Specify Phase (`/specify` or Kilocode Specify mode)
- Create detailed feature specifications
- Set up feature branches
- Generate user stories and acceptance criteria

### 2. Plan Phase (`/plan` or Kilocode Plan mode)
- Analyze specifications and create implementation plans
- Generate technical architecture documentation
- Break down features into development phases

### 3. Tasks Phase (`/tasks` or Kilocode Tasks mode)
- Decompose plans into executable tasks
- Define task dependencies and execution order
- Apply Test-Driven Development principles

## Usage Examples

### With Kilocode
After running `spec-kit kilocode`, use the custom modes in your Kilocode workspace:
- Select "📝 Specify Feature" mode to start a new feature
- Select "📋 Plan Implementation" mode to plan implementation
- Select "✅ Break Down Tasks" mode to create task lists

### With Clinerules (Cline AI)
After running `spec-kit clinerules`, use slash commands with Cline:
```
/specify Create a user authentication system with login and logout
/plan Focus on security and scalability requirements
/tasks Prioritize test-driven development approach
```

## Requirements

- Node.js 14.0.0 or higher
- Git (for feature branch management)
- Unix-like system recommended (for script execution)

## Development

To work on this project:

```bash
git clone <repository-url>
cd spec-kit-dumper
npm install
npm link  # For local testing
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read the contributing guidelines and submit pull requests for any improvements.
