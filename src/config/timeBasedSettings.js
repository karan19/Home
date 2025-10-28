/**
 * Time-Based Settings Configuration
 * 
 * Centralized configuration for all time-dependent features
 * Modify these values to change when features activate
 */

export const TIME_BASED_CONFIG = {
  // Newspaper delivery (RolledNewspaper component)
  newspaper: {
    startHour: 6,        // Start time: 6 AM
    endHour: 11,         // End time: 11 AM
    playOnce: true,      // Only animate once per page refresh
    description: 'Newspaper is delivered between 6 AM and 11 AM, plays once per refresh'
  },
  
  // Mail delivery (FlyingPaper component)
  mail: {
    startHour: 8,        // Start time: 8 AM
    endHour: 17,         // End time: 5 PM (17:00 in 24-hour format)
    intervalMinutes: 10, // Repeat every 10 minutes
    description: 'Mail is delivered between 8 AM and 5 PM, repeats every 10 minutes'
  },
  
  // Day/Night cycle (App.jsx)
  dayNight: {
    dayStartHour: 6,     // Day starts: 6 AM
    dayEndHour: 18,      // Day ends: 6 PM (18:00 in 24-hour format)
    description: 'Day mode: 6 AM - 6 PM, Night mode: 6 PM - 6 AM'
  },
  
  // Night weather (App.jsx)
  nightWeather: {
    enabled: true,                    // Enable random weather at night
    options: ['rain', 'snow'],        // Random choice between rain and snow
    changeIntervalMinutes: 20,        // Change weather every 20 minutes
    description: 'During night mode (6 PM - 6 AM), weather randomly switches between rain and snow every 20 minutes'
  }
};

// Simulated time for dev mode (set by SettingsPanel)
let simulatedHour = null;
let simulatedMinute = null;

/**
 * Set simulated time for development mode
 * @param {string} timeString - Time in HH:MM format (e.g., "11:30")
 */
export const setSimulatedTime = (timeString) => {
  if (timeString) {
    const [hours, minutes] = timeString.split(':');
    simulatedHour = parseInt(hours, 10);
    simulatedMinute = parseInt(minutes, 10);
  } else {
    simulatedHour = null;
    simulatedMinute = null;
  }
};

/**
 * Get current hour (real or simulated)
 * @param {boolean} isDevelopment - Whether in development mode
 * @returns {number} Current hour (0-23), with minutes as decimal
 */
export const getCurrentHour = (isDevelopment = false) => {
  // In dev mode, use simulated time if set
  if (isDevelopment && simulatedHour !== null) {
    // Return hour with minutes as decimal (e.g., 6.5 for 6:30)
    return simulatedHour + (simulatedMinute || 0) / 60;
  }
  // Otherwise use real time
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
};

/**
 * Helper function to check if current time is within a time window
 * @param {number} startHour - Start hour (0-23)
 * @param {number} endHour - End hour (0-23)
 * @param {boolean} isDevelopment - Whether in development mode
 * @returns {boolean} True if current time is within the window
 */
export const isWithinTimeWindow = (startHour, endHour, isDevelopment = false) => {
  const hour = getCurrentHour(isDevelopment);
  return hour >= startHour && hour < endHour;
};

/**
 * Helper function to check if it's currently day time
 * @param {boolean} isDevelopment - Whether in development mode
 * @returns {boolean} True if it's day time
 */
export const isDayTime = (isDevelopment = false) => {
  return isWithinTimeWindow(
    TIME_BASED_CONFIG.dayNight.dayStartHour,
    TIME_BASED_CONFIG.dayNight.dayEndHour,
    isDevelopment
  );
};

/**
 * Helper function to check if newspaper should be delivered
 * @param {boolean} isDevelopment - Whether in development mode
 * @returns {boolean} True if within newspaper delivery hours
 */
export const isNewspaperTime = (isDevelopment = false) => {
  return isWithinTimeWindow(
    TIME_BASED_CONFIG.newspaper.startHour,
    TIME_BASED_CONFIG.newspaper.endHour,
    isDevelopment
  );
};

/**
 * Helper function to check if mail should be delivered
 * @param {boolean} isDevelopment - Whether in development mode
 * @returns {boolean} True if within mail delivery hours
 */
export const isMailTime = (isDevelopment = false) => {
  return isWithinTimeWindow(
    TIME_BASED_CONFIG.mail.startHour,
    TIME_BASED_CONFIG.mail.endHour,
    isDevelopment
  );
};
