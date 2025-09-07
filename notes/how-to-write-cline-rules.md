# How to Write High-Quality Cline Rules: Complete Guide

## Table of Contents
- [Introduction](#introduction)
- [What are Cline Rules?](#what-are-cline-rules)
- [File Structure and Location](#file-structure-and-location)
- [Rule File Format](#rule-file-format)
- [Frontmatter Configuration](#frontmatter-configuration)
- [Writing Effective Rules](#writing-effective-rules)
- [Rule Types and Examples](#rule-types-and-examples)
- [Best Practices](#best-practices)
- [Advanced Features](#advanced-features)
- [Common Patterns](#common-patterns)
- [Community Resources](#community-resources)
- [Troubleshooting](#troubleshooting)

## Introduction

Cline rules are a powerful feature that allows you to customize Cline's behavior for specific projects, file types, or workflows. They provide a way to give Cline context-specific instructions, coding standards, and behavioral guidelines that persist across sessions.

This guide is based on the official Cline community prompts repository and best practices observed in high-quality rule implementations.

## What are Cline Rules?

Cline rules are markdown files that contain instructions for how Cline should behave in specific contexts. They can:

- Define coding standards and conventions
- Specify project-specific workflows
- Provide context about technologies and frameworks
- Set behavioral guidelines for different file types
- Create reusable templates and patterns
- Implement methodological approaches (like Baby Steps™)

## File Structure and Location

### Directory Structure
```
project-root/
├── .clinerules/
│   ├── global-rule.md
│   ├── python-specific.md
│   ├── workflows/
│   │   └── deployment.md
│   └── methodologies/
│       └── baby-steps.md
└── src/
    └── components/
        └── .clinerules/
            └── component-rules.md
```

### Rule Discovery
Cline discovers rules by:
1. Looking in `.clinerules/` directories
2. Starting from the current working directory
3. Walking up the directory tree to find parent `.clinerules/` directories
4. Applying rules based on glob patterns and file matching

### File Naming Conventions
- Use descriptive names: `python-coding-standards.md`
- Group related rules: `workflows/deployment-process.md`
- Use kebab-case for consistency: `react-component-guidelines.md`

## Rule File Format

### Basic Structure
```markdown
---
description: Brief description of what this rule does
author: Your Name
version: 1.0
tags: ["tag1", "tag2", "tag3"]
globs: ["**/*.py", "**/*.js"]
---

# Rule Title

## Rule Content

Your rule instructions go here...
```

### Required Elements
1. **Frontmatter**: YAML metadata at the top
2. **Content**: Markdown-formatted instructions
3. **Clear structure**: Use headings and sections

## Frontmatter Configuration

### Essential Fields

#### `description` (Required)
```yaml
description: "Defines Python coding standards and best practices for this project"
```
- Brief, clear explanation of the rule's purpose
- Helps Cline understand when to apply the rule

#### `globs` (Recommended)
```yaml
globs: ["**/*.py", "**/*.pyx", "tests/**/*.py"]
```
- Specifies which files this rule applies to
- Uses glob patterns for flexible matching
- Multiple patterns supported

#### `tags` (Optional)
```yaml
tags: ["python", "coding-standards", "testing", "documentation"]
```
- Categorizes rules for organization
- Helps with rule discovery and management
- Use consistent tagging across rules

#### `author` and `version` (Optional)
```yaml
author: "Development Team"
version: "2.1"
```
- Tracks rule ownership and evolution
- Useful for team collaboration

### Advanced Frontmatter Options

#### `priority` (Optional)
```yaml
priority: 10
```
- Higher numbers = higher priority
- Useful when multiple rules might conflict

#### `enabled` (Optional)
```yaml
enabled: true
```
- Allows temporarily disabling rules
- Defaults to `true` if not specified

## Writing Effective Rules

### 1. Be Specific and Clear
```markdown
# ❌ Vague
Write good code.

# ✅ Specific
Use descriptive variable names that clearly indicate their purpose. 
Prefer `user_email` over `email` and `total_price` over `price`.
```

### 2. Use Actionable Language
```markdown
# ❌ Passive
Code should be documented.

# ✅ Actionable
**MUST**: Add docstrings to all public functions using Google-style format.
**SHOULD**: Include type hints for all function parameters and return values.
```

### 3. Use Strong Behavioral Instructions
Based on the Baby Steps™ methodology example, effective rules use:
- **Bold emphasis** for critical concepts
- **Mandatory language**: "You must", "You will always"
- **Repetition** of key principles
- **Clear consequences** and expectations

```markdown
## 🚨 CRITICAL AI BEHAVIORAL INSTRUCTIONS

You **MUST** follow these guidelines without exception:

1. **Rule 1: Always Validate Changes**
   You must validate every change before proceeding. Never assume code works without testing.

2. **Rule 2: Document Everything**
   You must document every decision and change. Documentation is not optional.
```

### 4. Provide Examples
```markdown
## Function Documentation

**Required Format:**
```python
def calculate_total(items: List[Item], tax_rate: float) -> float:
    """Calculate the total price including tax.
    
    Args:
        items: List of items to calculate total for
        tax_rate: Tax rate as decimal (e.g., 0.08 for 8%)
        
    Returns:
        Total price including tax
        
    Raises:
        ValueError: If tax_rate is negative
    """
    # Implementation here
```
```

### 5. Structure with Clear Headings
```markdown
# Python Coding Standards

## Code Formatting
- Use Black for code formatting
- Line length: 88 characters maximum

## Import Organization
- Standard library imports first
- Third-party imports second
- Local imports last

## Error Handling
- Use specific exception types
- Always include error context
```

## Rule Types and Examples

### 1. Methodological Rules (High Impact)
Based on the Baby Steps™ example, these rules define how Cline should approach work:

```markdown
---
description: "Enforces incremental development methodology"
tags: ["methodology", "process", "core-behavior"]
globs: ["**/*"]
---

# Incremental Development Methodology

## Core Principle
You **MUST** break down every task into the smallest possible meaningful changes.

## Unbreakable Rules
1. **One Change at a Time**: Never attempt multiple modifications simultaneously
2. **Validate Each Step**: Test and verify every change before proceeding
3. **Document Progress**: Record every decision and outcome

**Remember**: The process is as important as the product.
```

### 2. Coding Standards Rules
```markdown
---
description: "Python coding standards and conventions"
globs: ["**/*.py"]
tags: ["python", "standards", "formatting"]
---

# Python Coding Standards

## Formatting Requirements
- **MUST** use Black for code formatting
- **MUST** use isort for import sorting
- **MUST** limit lines to 88 characters

## Naming Conventions
- Variables: `snake_case`
- Functions: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`

## Documentation
- **MUST** include docstrings for all public functions
- **SHOULD** use type hints for all parameters
```

### 3. Framework-Specific Rules
```markdown
---
description: "React component development guidelines"
globs: ["**/*.tsx", "**/*.jsx"]
tags: ["react", "components", "typescript"]
---

# React Component Guidelines

## Component Structure
```typescript
// ✅ Preferred structure
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  // Component logic
  return <div>{title}</div>;
};
```

## State Management
- Use `useState` for local component state
- Use `useReducer` for complex state logic
- Prefer custom hooks for reusable stateful logic
```

### 4. Workflow Rules
```markdown
---
description: "Git workflow and commit message standards"
globs: ["**/*"]
tags: ["git", "workflow", "commits"]
---

# Git Workflow Standards

## Branch Naming
- Feature branches: `feature/description-of-feature`
- Bug fixes: `fix/description-of-fix`
- Hotfixes: `hotfix/description-of-hotfix`

## Commit Messages
Follow conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
```

### 5. Project Context Rules
```markdown
---
description: "Project architecture and technology context"
globs: ["**/*"]
tags: ["architecture", "context", "technologies"]
---

# Project Context

## Technology Stack
- **Backend**: FastAPI with Python 3.11+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Frontend**: React with TypeScript
- **Testing**: pytest for backend, Jest for frontend

## Architecture Patterns
- Follow Clean Architecture principles
- Use dependency injection for services
- Implement repository pattern for data access

## Key Directories
- `src/api/`: FastAPI application code
- `src/models/`: Database models
- `src/services/`: Business logic
- `tests/`: Test files
```

## Best Practices

### 1. Rule Organization
- **One concern per rule**: Don't mix coding standards with deployment instructions
- **Hierarchical structure**: Use subdirectories for complex rule sets
- **Consistent naming**: Use clear, descriptive filenames

### 2. Content Guidelines
- **Be prescriptive**: Use "MUST", "SHOULD", "MAY" for clarity
- **Include rationale**: Explain why rules exist
- **Provide examples**: Show both correct and incorrect patterns
- **Keep updated**: Review and update rules regularly

### 3. Glob Pattern Best Practices
```yaml
# ✅ Good patterns
globs: ["**/*.py"]           # All Python files
globs: ["src/**/*.ts"]       # TypeScript files in src
globs: ["tests/**/*"]        # All test files

# ❌ Avoid overly broad patterns
globs: ["**/*"]              # Too broad, applies everywhere
```

### 4. Collaboration Guidelines
- **Version your rules**: Use semantic versioning
- **Document changes**: Include changelog in rule files
- **Team review**: Have rules reviewed by team members
- **Gradual adoption**: Introduce new rules incrementally

### 5. Writing Style for AI Instructions
Based on successful community examples:

```markdown
## 🚨 CRITICAL AI BEHAVIORAL INSTRUCTIONS

You are an expert [role]. When [condition], you **MUST** [action].

### ⚠️ MANDATORY [PROCESS NAME]

**TRIGGER DETECTION:**
- If [condition] → [action]
- If [condition] → [action]

**VERIFICATION STEPS:**
```
<thinking>
- Have I [checked condition]?
- Am I following [process]?
- What are the [requirements]?
</thinking>
```

### 🎯 [SECTION] REQUIREMENTS

#### [Subsection]
**Role**: [Description]
**Expertise**: [List of capabilities]
**When to Use**: [Specific scenarios]
```

## Advanced Features

### 1. Conditional Rules
```markdown
## Environment-Specific Behavior

When working in development:
- Enable debug logging
- Use development database
- Skip authentication for testing endpoints

When working in production:
- **NEVER** commit debug code
- **ALWAYS** use environment variables for secrets
- **MUST** include error handling
```

### 2. Multi-Language Rules
```markdown
---
description: "API development standards for multiple languages"
globs: ["**/*.py", "**/*.js", "**/*.go"]
tags: ["api", "standards", "multi-language"]
---

# API Development Standards

## Python (FastAPI)
```python
@app.get("/users/{user_id}")
async def get_user(user_id: int) -> UserResponse:
    # Implementation
```

## JavaScript (Express)
```javascript
app.get('/users/:userId', async (req, res) => {
  // Implementation
});
```

## Go (Gin)
```go
func GetUser(c *gin.Context) {
    // Implementation
}
```
```

### 3. Template Rules
```markdown
---
description: "Code templates and scaffolding patterns"
globs: ["**/*.py"]
tags: ["templates", "scaffolding"]
---

# Code Templates

## New Service Template
```python
from abc import ABC, abstractmethod
from typing import Optional

class BaseService(ABC):
    """Base service class with common functionality."""
    
    @abstractmethod
    async def create(self, data: dict) -> dict:
        """Create a new resource."""
        pass
    
    @abstractmethod
    async def get_by_id(self, id: int) -> Optional[dict]:
        """Get resource by ID."""
        pass
```

When creating new services:
1. Inherit from `BaseService`
2. Implement all abstract methods
3. Add service-specific methods as needed
```

## Common Patterns

### 1. Technology-Specific Rules
```markdown
# Docker Development Rules
---
description: "Docker and containerization guidelines"
globs: ["**/Dockerfile", "**/*.docker", "**/docker-compose.yml"]
---

# Testing Framework Rules
---
description: "Testing standards and practices"
globs: ["tests/**/*", "**/*test*", "**/*spec*"]
---
```

### 2. Role-Based Rules
```markdown
# Frontend Developer Rules
---
description: "Guidelines for frontend development"
globs: ["src/components/**/*", "src/pages/**/*", "**/*.css"]
---

# Backend Developer Rules
---
description: "Guidelines for backend development"
globs: ["src/api/**/*", "src/models/**/*", "src/services/**/*"]
---
```

### 3. Phase-Based Rules
```markdown
# Development Phase Rules
---
description: "Guidelines during active development"
globs: ["**/*"]
tags: ["development", "wip"]
---

# Production Readiness Rules
---
description: "Requirements before production deployment"
globs: ["**/*"]
tags: ["production", "deployment"]
---
```

## Community Resources

### Official Resources
- **Community Prompts Repository**: https://github.com/cline/prompts
- **Official Documentation**: https://docs.cline.bot/features/cline-rules
- **Community Collection**: https://cline.bot/prompts

### Contributing to the Community
1. **Fork** the prompts repository
2. **Create** a new Markdown file in `.clinerules/` directory
3. **Name** your file using `kebab-case`
4. **Add** your rule content
5. **Submit** a Pull Request

### Learning from Examples
The community repository contains excellent examples:
- `baby-steps.md`: Methodological approach
- `ba.md`: Business analyst workflows
- `cline-architecture.md`: Technical architecture guidance
- `claude-code-subagents.md`: Advanced automation patterns

## Troubleshooting

### Common Issues

#### 1. Rules Not Being Applied
**Problem**: Cline doesn't seem to follow the rules
**Solutions**:
- Check glob patterns match your files
- Verify frontmatter YAML syntax
- Ensure `.clinerules` directory is in the right location
- Check for conflicting rules

#### 2. Glob Patterns Not Matching
**Problem**: Rules don't apply to expected files
**Solutions**:
```yaml
# ❌ Common mistakes
globs: ["*.py"]          # Only matches root directory
globs: ["/src/**/*.py"]  # Leading slash prevents matching

# ✅ Correct patterns
globs: ["**/*.py"]       # Matches all Python files
globs: ["src/**/*.py"]   # Matches Python files in src
```

#### 3. Rule Conflicts
**Problem**: Multiple rules give conflicting instructions
**Solutions**:
- Use `priority` field to establish precedence
- Make rules more specific with better glob patterns
- Consolidate related rules into single files

#### 4. Performance Issues
**Problem**: Too many rules slow down Cline
**Solutions**:
- Use specific glob patterns instead of `**/*`
- Combine related rules into single files
- Disable unused rules with `enabled: false`

### Debugging Rules
```markdown
# Debug Rule Application
Add this temporary rule to see what's being applied:

---
description: "Debug rule application"
globs: ["**/*"]
---

# Debug Mode
Log all applied rules and their sources.
```

## Conclusion

High-quality Cline rules are:
1. **Specific and actionable**
2. **Well-structured with clear headings**
3. **Properly scoped with glob patterns**
4. **Documented with examples**
5. **Consistent in style and format**

The most effective rules combine clear behavioral instructions with practical examples, following patterns established by the community. Start with simple rules and gradually build more sophisticated ones as you understand your workflow needs.

Remember: The goal is to make Cline more effective and consistent in your specific context, not to create overly complex or restrictive rules that hinder productivity.

## Quick Start Template

```markdown
---
description: "Brief description of what this rule does"
author: "Your Name"
version: "1.0"
tags: ["relevant", "tags"]
globs: ["**/*.ext"]
---

# Rule Title

## Purpose
Brief explanation of why this rule exists.

## Requirements
- **MUST**: Critical requirement
- **SHOULD**: Strong recommendation
- **MAY**: Optional guideline

## Examples
```language
// Good example
code_here();
```

## Verification
How to check if the rule is being followed correctly.
```

Use this template as a starting point for creating your own high-quality Cline rules.
