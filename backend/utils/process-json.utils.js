// process-json.utils.js
function preprocessForGPT(jsonData) {
  // Start building a summary string
  let summary = '';

  jsonData.forEach((item, index) => {
    summary += `Item ${index + 1}: \n`;
    summary += `Title: ${item.properties.TaskTitle.join(', ')}\n`;
    summary += `Status: ${item.properties.Status}\n`;
    summary += `Domain: ${item.properties.Domain.join(', ')}\n`;

    if (item.properties.Started) {
      summary += `Started: ${item.properties.Started}\n`;
    }

    if (item.properties.LastEditedTime) {
      summary += `Last Edited: ${item.properties.LastEditedTime}\n`;
    }

    if (item.properties.Owner && item.properties.Owner.length > 0) {
      summary += `Owner IDs: ${item.properties.Owner.join(', ')}\n`;
    }

    if (item.properties.ParentItem && item.properties.ParentItem.length > 0) {
      summary += `Parent Item IDs: ${item.properties.ParentItem.join(', ')}\n`;
    }

    // Add more fields as necessary
    summary += '\n'; // Separate items
  });

  return summary;
}

module.exports = { preprocessForGPT };
