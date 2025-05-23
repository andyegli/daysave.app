/**
 * content.js for daysave.app v1.0.1
 * This file handles client-side functionality for batch actions on the dashboard, 
 * including selecting content blocks, and performing batch delete, edit, 
 * archive, and share actions via API calls to the backend.
 */
let selectedContent = [];

/**
 * Toggle selection of a content block
 * @param {string} contentId - The ID of the content to select/deselect
 */
function batchSelect(contentId) {
  const index = selectedContent.indexOf(contentId);
  const element = document.querySelector(
    `.content-block[style*="border-color"][onclick="batchSelect('${contentId}')"]`
  );

  if (index === -1) {
    selectedContent.push(contentId);
    element.classList.add('selected');
  } else {
    selectedContent.splice(index, 1);
    element.classList.remove('selected');
  }
}

/**
 * Perform a batch delete action
 */
async function batchDelete() {
  if (!selectedContent.length) {
    alert('Please select at least one content item.');
    return;
  }
  try {
    const response = await fetch('/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedContent, action: 'delete' }),
    });
    if (response.ok) {
      alert('Content deleted successfully');
      window.location.reload();
    } else {
      alert('Failed to delete content');
    }
  } catch (error) {
    console.error('Error deleting content:', error);
    alert('Error deleting content');
  }
}

/**
 * Perform a batch edit action (placeholder: updates title)
 */
async function batchEdit() {
  if (!selectedContent.length) {
    alert('Please select at least one content item.');
    return;
  }
  const newTitle = prompt('Enter new title for selected content:');
  if (!newTitle) return;

  try {
    const response = await fetch('/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedContent,
        action: 'edit',
        title: newTitle,
      }),
    });
    if (response.ok) {
      alert('Content updated successfully');
      window.location.reload();
    } else {
      alert('Failed to update content');
    }
  } catch (error) {
    console.error('Error updating content:', error);
    alert('Error updating content');
  }
}

/**
 * Perform a batch archive action
 */
async function batchArchive() {
  if (!selectedContent.length) {
    alert('Please select at least one content item.');
    return;
  }
  try {
    const response = await fetch('/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedContent, action: 'archive' }),
    });
    if (response.ok) {
      alert('Content archived successfully');
      window.location.reload();
    } else {
      alert('Failed to archive content');
    }
  } catch (error) {
    console.error('Error archiving content:', error);
    alert('Error archiving content');
  }
}

/**
 * Perform a batch share action (placeholder: shares with a contact ID)
 */
async function batchShare() {
  if (!selectedContent.length) {
    alert('Please select at least one content item.');
    return;
  }
  const contactId = prompt('Enter contact ID to share with:');
  if (!contactId) return;

  try {
    const response = await fetch('/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: selectedContent,
        action: 'share',
        contacts: contactId,
      }),
    });
    if (response.ok) {
      alert('Content shared successfully');
      window.location.reload();
    } else {
      alert('Failed to share content');
    }
  } catch (error) {
    console.error('Error sharing content:', error);
    alert('Error sharing content');
  }
}