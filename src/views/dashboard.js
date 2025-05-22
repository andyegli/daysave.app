// File: src/views/dashboard.js
// This file defines the HTML structure for the dashboard view of the application.
// It includes a grid layout for displaying content blocks, each with a title, preview, tags, and comments. 
<!DOCTYPE html>
<html>
<head>
  <title>daysave.app v1.0.1 - Dashboard</title>
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .content-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
    .content-block {
      border: 2px solid;
      padding: 10px;
      width: 300px;
      border-radius: 5px;
    }
    .preview {
      margin: 10px 0;
    }
    .tags .tag,
    .comments p {
      margin-right: 5px;
    }
    .batch-actions {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <%- include('../partials/navbar') %>
  <div class="content-grid">
    <% contents.forEach(content => { %>
      <div
        class="content-block"
        style="border-color: <%= colors[content.ContentSource.name] || '#008AA0' %>"
      >
        <h3><%= content.title %></h3>
        <div class="preview">Preview</div>
        <div class="tags">
          <% content.Tags.forEach(tag => { %>
            <span class="tag"><%= tag.name %></span>
          <% }) %>
        </div>
        <div class="comments">
          <% content.Comments.forEach(comment => { %>
            <p><%= comment.comment %></p>
          <% }) %>
        </div>
        <button onclick="batchSelect('<%= content.id %>')">Select</button>
      </div>
    <% }) %>
  </div>
  <div class="batch-actions">
    <button onclick="batchDelete()">Delete</button>
    <button onclick="batchEdit()">Edit</button>
    <button onclick="batchArchive()">Archive</button>
    <button onclick="batchShare()">Share</button>
  </div>
  <script src="/js/content.js"></script>
</body>
</html>