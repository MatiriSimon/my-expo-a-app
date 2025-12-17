// Export utility function to format date string into a readable format
export function formatDate(dateString) {
  // Create new Date object from the date string
  const date = new Date(dateString);
  // Format date nicely using toLocaleDateString with US locale
  // Example: from this 👉 2025-05-20 to this 👉 May 20, 2025
  return date.toLocaleDateString("en-US", {
    // Include year in 4-digit format
    year: "numeric",
    // Include month in full name (e.g., "May")
    month: "long",
    // Include day of month as number (e.g., "20")
    day: "numeric",
  });
}