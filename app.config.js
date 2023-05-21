module.exports = {
  name: "workout_tracker_app",
  version: "1.0.0",
  extra: {
    apiUrl: process.env.API_URL,
  },
  ios: {
    bundleIdentifier: "my.workouttracker.app",
  },
};
