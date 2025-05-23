# Alternatives and Inspirations

Daysave is a web application designed for managing personal content, contacts, and subscriptions, targeting users who need a simple, privacy-focused tool for organizing their digital life. This document lists alternative applications to Daysave and sources of inspiration for its development.

## Alternative Applications

| Application     | Key Features                          | Strengths                          | Weaknesses                        |
|-----------------|---------------------------------------|------------------------------------|-----------------------------------|
| **Notion**      | Collaboration, databases, templates   | Highly flexible, great for teams   | Can be overwhelming for simple use |
| **Evernote**    | Tags, notebooks, cross-device syncing | Robust organization, reliable sync | Premium features behind paywall  |
| **Google Keep** | Checklists, reminders, labels         | Simple, integrates with Google    | Limited features for complex tasks |
| **Obsidian**    | Markdown, graph view, linking ideas   | Powerful for knowledge management  | Steeper learning curve           |
| **Todoist**     | To-do lists, due dates, projects      | Intuitive task management          | Less focus on note-taking        |

## Inspirations

- **Notion's Flexibility**:
  - Influence: Inspired Daysave's support for multiple content types (e.g., notes, contacts, subscriptions).
  - Implementation: Daysave uses separate tables (`content`, `contacts`, `subscriptions`) to store different types of data.
- **Evernote's Tagging System**:
  - Influence: Influenced the tagging feature for organizing content in Daysave.
  - Implementation: Daysave uses a `tags` table and a `content_tags` junction table to associate tags with content.
- **Obsidian’s Graph View**:
  - Influence: Inspired the idea of visualizing relationships between content items (planned feature).
  - Implementation: Future feature to display content relationships (e.g., shared content, comments) in a graph view.
- **Google Keep's Simplicity**:
  - Influence: Influenced the minimalist UI design for Daysave.
  - Implementation: Daysave uses EJS templates with a clean, straightforward layout.
- **Todoist’s Task Management**:
  - Influence: Inspired the subscription management feature with start/end dates.
  - Implementation: Daysave’s `subscriptions` table includes `start_date` and `end_date` fields to track subscription periods.

## How Daysave Differs

- **Privacy Focus**: Unlike Notion and Google Keep, Daysave prioritizes user privacy by avoiding cloud-based data collection.
- **Simplicity**: Daysave offers a simpler interface compared to feature-heavy tools like Notion and Evernote, targeting users who need basic organization without complexity.
- **Integrated Features**: Combines content management, contact organization, and subscription tracking in one app, unlike Todoist’s focus on tasks or Obsidian’s focus on knowledge graphs.

## Future Considerations

- **AI Integration**:
  - Explore integrating AI features like Notion AI for content generation (e.g., summarizing notes).
- **Collaboration**:
  - Add collaboration features similar to Notion or Google Keep, such as real-time editing for shared content.
- **Graph View**:
  - Implement a graph view for content relationships, inspired by Obsidian, to visualize connections between notes, contacts, and subscriptions.