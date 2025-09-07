# Kilo Code Custom Mode YAML Fields Documentation

This document provides a comprehensive reference for all fields available in Kilo Code custom mode YAML configuration files.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Core Fields](#core-fields)
- [Advanced Fields](#advanced-fields)
- [Tool Groups Configuration](#tool-groups-configuration)
- [File Restrictions](#file-restrictions)
- [Regular Expression Patterns](#regular-expression-patterns)
- [Configuration Examples](#configuration-examples)
- [Best Practices](#best-practices)

## Overview

Kilo Code custom modes are defined using YAML configuration files that specify the behavior, permissions, and characteristics of each mode. These configurations can be either global (available across all projects) or project-specific.

### Configuration File Locations

- **Global Modes**: `custom_modes.yaml` (preferred) or `custom_modes.json`
- **Project Modes**: `.kilocodemodes` file in project root (YAML or JSON format)

## File Structure

The basic structure of a custom modes YAML file:

```yaml
customModes:
  - slug: mode-identifier
    name: Display Name
    description: Brief description
    roleDefinition: Detailed role description
    groups: [tool, groups, list]
    whenToUse: Optional usage guidance
    customInstructions: Optional additional instructions
```

## Core Fields

### `slug` (Required)

**Purpose**: Unique identifier for the mode used internally by Kilo Code.

**Format**: 
- Must match pattern `/^[a-zA-Z0-9-]+$/`
- Only letters, numbers, and hyphens allowed
- Used in file/directory names for mode-specific rules

**Example**:
```yaml
slug: docs-writer
```

**Usage**: Referenced in rule directories (`.kilo/rules-{slug}/`) and file names (`.kilorules-{slug}`)

---

### `name` (Required)

**Purpose**: Human-readable display name shown in the Kilo Code UI.

**Format**: 
- Can include spaces, emojis, and proper capitalization
- Appears in mode selector interface

**Example**:
```yaml
name: 📝 Documentation Writer
```

---

### `description` (Required)

**Purpose**: Short, user-friendly summary displayed in the mode selector UI.

**Format**: 
- Concise description of the mode's purpose
- Appears below the mode name in the interface
- Should focus on what the mode does for the user

**Example**:
```yaml
description: A specialized mode for writing and editing technical documentation.
```

---

### `roleDefinition` (Required)

**Purpose**: Defines the core identity, expertise, and personality of the mode.

**Format**: 
- Detailed description of the mode's role and capabilities
- Placed at the beginning of the system prompt when mode is active
- Can be multi-line using YAML literal (`|`) or folded (`>`) block scalars

**Examples**:

Single line:
```yaml
roleDefinition: You are a technical writer specializing in clear documentation.
```

Multi-line (literal block):
```yaml
roleDefinition: |
  You are a test engineer with expertise in:
  - Writing comprehensive test suites
  - Test-driven development
  - Code quality assurance
```

Multi-line (folded block):
```yaml
roleDefinition: >-
  You are a security specialist focused on identifying vulnerabilities
  and ensuring code security best practices are followed.
```

---

### `groups` (Required)

**Purpose**: Defines which tool groups the mode can access and any file restrictions.

**Format**: Array/list of tool group identifiers with optional restrictions.

**Available Tool Groups**:
- `read` - File reading capabilities
- `edit` - File editing capabilities  
- `browser` - Web browsing tools
- `command` - Command execution tools
- `mcp` - Model Context Protocol tools

**Structure Options**:

1. **Simple string** (unrestricted access):
```yaml
groups:
  - read
  - browser
```

2. **Tuple/Array** (with restrictions):
```yaml
groups:
  - read
  - - edit  # First element: tool group
    - fileRegex: \.(md|mdx)$  # Second element: restrictions
      description: Markdown files only
  - command
```

## Advanced Fields

### `whenToUse` (Optional)

**Purpose**: Provides guidance for Kilo's automated decision-making and task orchestration.

**Format**: 
- String describing ideal scenarios or task types
- Used by the Orchestrator mode for automated mode selection
- Not displayed in the mode selector UI

**Example**:
```yaml
whenToUse: Use this mode for writing and editing documentation, README files, and technical guides.
```

---

### `customInstructions` (Optional)

**Purpose**: Additional behavioral guidelines and rules for the mode.

**Format**: 
- String containing specific instructions
- Added near the end of the system prompt
- Can be multi-line using YAML block scalars

**Examples**:

Single line:
```yaml
customInstructions: Focus on clarity and completeness in documentation.
```

Multi-line:
```yaml
customInstructions: |
  When writing tests:
  - Use describe/it blocks
  - Include meaningful descriptions
  - Follow AAA pattern (Arrange, Act, Assert)
```

## Tool Groups Configuration

### Basic Tool Groups

```yaml
groups:
  - read      # File reading access
  - edit      # File editing access
  - browser   # Web browsing capabilities
  - command   # Command execution
  - mcp       # Model Context Protocol tools
```

### Restricted Tool Groups

For the `edit` group, you can specify file restrictions:

```yaml
groups:
  - read
  - - edit
    - fileRegex: \.(js|ts|jsx|tsx)$
      description: JavaScript and TypeScript files only
  - browser
```

## File Restrictions

### `fileRegex` Field

**Purpose**: Regular expression pattern to control which files the mode can edit.

**Format**: 
- String containing a valid regular expression
- Matches against full relative file path from workspace root
- Case-sensitive by default

**YAML vs JSON Escaping**:
- **YAML**: Usually single backslashes (e.g., `\.md$`)
- **JSON**: Double-escaped backslashes (e.g., `\\.md$`)

### `description` Field

**Purpose**: Optional human-readable description of the file restriction.

**Format**: String explaining what files are allowed/restricted.

**Example**:
```yaml
groups:
  - - edit
    - fileRegex: \.(test|spec)\.(js|ts)$
      description: Test files only
```

## Regular Expression Patterns

### Common Patterns

| Pattern (YAML) | Matches | Doesn't Match |
|----------------|---------|---------------|
| `\.md$` | `readme.md`, `docs/guide.md` | `script.js`, `readme.md.bak` |
| `^src/.*` | `src/app.js`, `src/components/button.tsx` | `lib/utils.js`, `test/src/mock.js` |
| `\.(css\|scss)$` | `styles.css`, `theme.scss` | `styles.less`, `styles.css.map` |
| `docs/.*\.md$` | `docs/guide.md`, `docs/api/reference.md` | `guide.md`, `src/docs/notes.md` |
| `^(?!.*(test\|spec))\.(js\|ts)$` | `app.js`, `utils.ts` | `app.test.js`, `utils.spec.js` |

### Regex Building Blocks

- `\.` - Matches a literal dot
- `$` - Matches end of string
- `^` - Matches beginning of string
- `.*` - Matches any character zero or more times
- `(a|b)` - Matches either "a" or "b"
- `(?!...)` - Negative lookahead
- `[abc]` - Matches any character in brackets
- `[^abc]` - Matches any character NOT in brackets
- `+` - One or more occurrences
- `*` - Zero or more occurrences
- `?` - Zero or one occurrence

## Configuration Examples

### Basic Documentation Writer

```yaml
customModes:
  - slug: docs-writer
    name: 📝 Documentation Writer
    description: Specialized for writing and editing technical documentation
    roleDefinition: You are a technical writer specializing in clear documentation.
    groups:
      - read
      - - edit
        - fileRegex: \.md$
          description: Markdown files only
    customInstructions: Focus on clear explanations and provide examples.
```

### Test Engineer with Restrictions

```yaml
customModes:
  - slug: test-engineer
    name: 🧪 Test Engineer
    description: Focused on writing and maintaining test suites
    roleDefinition: |
      You are a test engineer focused on code quality and comprehensive testing.
      Your expertise includes unit testing, integration testing, and test automation.
    whenToUse: Use for writing tests, debugging test failures, and improving test coverage.
    groups:
      - read
      - - edit
        - fileRegex: \.(test|spec)\.(js|ts)$
          description: Test files only
      - command
    customInstructions: |
      When writing tests:
      - Use describe/it blocks for structure
      - Include meaningful test descriptions
      - Follow AAA pattern (Arrange, Act, Assert)
      - Ensure good test coverage
```

### Security Review Mode (Read-Only)

```yaml
customModes:
  - slug: security-review
    name: 🔒 Security Reviewer
    description: Read-only security analysis and vulnerability assessment
    roleDefinition: |
      You are a security specialist reviewing code for vulnerabilities.
      Focus on identifying potential security issues and recommending fixes.
    whenToUse: Use for security reviews and vulnerability assessments.
    customInstructions: |
      Focus on:
      - Input validation issues
      - Authentication and authorization flaws
      - Data exposure risks
      - Injection vulnerabilities
      - Cryptographic implementations
    groups:
      - read
      - browser
```

### Full-Stack Developer with Multiple File Types

```yaml
customModes:
  - slug: fullstack-dev
    name: 🌐 Full-Stack Developer
    description: Complete web development with frontend and backend capabilities
    roleDefinition: >-
      You are a full-stack developer with expertise in modern web technologies.
      You can work with both frontend and backend code, databases, and deployment.
    whenToUse: Use for full-stack web development projects requiring both frontend and backend work.
    groups:
      - read
      - - edit
        - fileRegex: \.(js|ts|jsx|tsx|py|html|css|scss|json|yaml|yml|sql)$
          description: Web development files
      - browser
      - command
    customInstructions: |
      Development guidelines:
      - Follow modern best practices
      - Ensure responsive design
      - Implement proper error handling
      - Use TypeScript when possible
      - Follow RESTful API conventions
```

### Python Data Scientist

```yaml
customModes:
  - slug: data-scientist
    name: 📊 Data Scientist
    description: Python-focused data analysis and machine learning
    roleDefinition: |
      You are a data scientist specializing in Python-based data analysis,
      machine learning, and statistical modeling. You excel at data visualization,
      feature engineering, and model development.
    whenToUse: Use for data analysis, machine learning projects, and statistical modeling.
    groups:
      - read
      - - edit
        - fileRegex: \.(py|ipynb|csv|json|yaml|yml)$
          description: Python and data files
      - command
    customInstructions: |
      Data science best practices:
      - Use pandas for data manipulation
      - Create clear visualizations
      - Document analysis steps
      - Validate data quality
      - Follow PEP 8 style guidelines
      - Use type hints where appropriate
```

## Best Practices

### Naming Conventions

1. **Slugs**: Use kebab-case (lowercase with hyphens)
   - ✅ `docs-writer`, `test-engineer`, `security-review`
   - ❌ `DocsWriter`, `test_engineer`, `Security Review`

2. **Names**: Use descriptive names with emojis for visual distinction
   - ✅ `📝 Documentation Writer`, `🧪 Test Engineer`
   - ❌ `Writer`, `Tests`

### File Restrictions

1. **Be Specific**: Use precise regex patterns
   - ✅ `\.(test|spec)\.(js|ts)$` for test files
   - ❌ `.*test.*` (too broad)

2. **Include Descriptions**: Always provide clear descriptions for restrictions
   ```yaml
   - edit
   - fileRegex: \.(md|mdx)$
     description: Markdown files only
   ```

3. **Test Patterns**: Validate regex patterns before deployment
   - Use online regex testers
   - Test with actual file paths from your project

### Role Definitions

1. **Be Specific**: Clearly define the mode's expertise and limitations
2. **Use Examples**: Include specific technologies or methodologies
3. **Multi-line Format**: Use YAML block scalars for complex definitions

### Custom Instructions

1. **Actionable Guidelines**: Provide specific, actionable instructions
2. **Format Consistently**: Use bullet points or numbered lists
3. **Include Examples**: Show expected patterns or formats

### Configuration Management

1. **Version Control**: Include mode configurations in version control
2. **Documentation**: Document custom modes in project README
3. **Team Sharing**: Use export/import features for team collaboration
4. **Regular Review**: Periodically review and update mode configurations

### Error Handling

1. **Validate YAML**: Use proper indentation (spaces, not tabs)
2. **Test Regex**: Verify regex patterns work as expected
3. **Check Precedence**: Understand global vs project mode precedence
4. **Monitor Usage**: Review mode effectiveness and adjust as needed

## Troubleshooting

### Common Issues

1. **Mode Not Appearing**: Reload VS Code window after creating/importing modes
2. **Invalid Regex**: Test patterns using online regex validators
3. **YAML Syntax Errors**: Validate YAML formatting and indentation
4. **File Restrictions Not Working**: Check regex escaping (single vs double backslashes)
5. **Precedence Issues**: Remember project modes completely override global modes with same slug

### Validation Tips

1. **YAML Validation**: Use online YAML validators or editor plugins
2. **Regex Testing**: Test patterns with actual file paths
3. **Mode Testing**: Create test files to verify restrictions work correctly
4. **Documentation**: Keep mode documentation updated with changes
