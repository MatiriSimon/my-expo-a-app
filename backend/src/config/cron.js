// Import cron package for scheduling periodic tasks
import cron from "cron";
// Import HTTPS module for making secure HTTP requests
import https from "https";

// Create a new cron job that runs every 14 minutes (*/14 * * * *)
const job = new cron.CronJob("*/14 * * * *", function () {
  // Make HTTPS GET request to the API URL
  https
    .get(process.env.API_URL, (res) => {
      // Check if response status is 200 (success)
      if (res.statusCode === 200) console.log("GET request sent successfully");
      // Log failure message if status code is not 200
      else console.log("GET request failed", res.statusCode);
    })
    // Handle any errors that occur during the request
    .on("error", (e) => console.error("Error while sending request", e));
});

// Export the cron job as default export
export default job;

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes

// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour