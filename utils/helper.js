import moment from "moment/moment";

export function generateRandomId() {
  const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
  const timestamp = Date.now(); // Get the current timestamp
  return `${randomString}-${timestamp}`; // Combine the random string and timestamp
}

export const getTime = () => moment().format("YYYY-MM-DD LT");
export const getDisplayTime = () => moment().format("LT");

const today = moment().startOf("day");

export const todayRecords = (records) =>
  records.filter((record) =>
    moment(record.time, "YYYY-MM-DD LT").isSame(today, "day")
  );

const last7Days = moment().subtract(7, "days").startOf("day");
export const last7DaysRecords = (records) =>
  records.filter((record) =>
    moment(record.time, "YYYY-MM-DD LT").isSameOrAfter(last7Days)
  );

const last30Days = moment().subtract(30, "days").startOf("day");
export const last30DaysRecords = (records) =>
  records.filter((record) =>
    moment(record.time, "YYYY-MM-DD LT").isSameOrAfter(last30Days)
  );

// Calculate weekly average
export const weeklyAverage = (records) =>
  records.reduce((sum, record) => {
    const recordDate = moment(record.time, "YYYY-MM-DD LT");
    const weekStart = moment().startOf("week");
    const weekEnd = moment().endOf("week");

    if (recordDate.isBetween(weekStart, weekEnd, "day", "[]")) {
      return sum + record.ml;
    }
    return sum;
  }, 0) / 7; // Divide by 7 to get average per day

// Calculate monthly average
export const monthlyAverage = (records) =>
  records.reduce((sum, record) => {
    const recordDate = moment(record.time, "YYYY-MM-DD LT");
    const monthStart = moment().startOf("month");
    const monthEnd = moment().endOf("month");

    if (recordDate.isBetween(monthStart, monthEnd, "day", "[]")) {
      return sum + record.ml;
    }
    return sum;
  }, 0) / moment().daysInMonth(); // Divide by the number of days in the current month

// console.log("Monthly Average:", monthlyAverage(records));

const wakeUpTime = "06:00 AM";
const sleepTime = "11:00 PM";

export const getReminderTimes = () => {
  const reminderTimes = [];

  // Convert wake-up and sleep times to moment objects
  const wakeUpMoment = moment(wakeUpTime, "hh:mm A");
  const sleepMoment = moment(sleepTime, "hh:mm A");

  // Calculate the duration between wake-up and sleep times
  const duration = moment.duration(sleepMoment.diff(wakeUpMoment));

  // Calculate the number of reminders to set (in this example, every 2 hours)
  const numberOfReminders = Math.floor(duration.asHours() / 2);

  // Generate reminder times based on wake-up time and interval
  for (let i = 1; i <= numberOfReminders; i++) {
    const reminderTime = moment(wakeUpMoment)
      .add(i * 2, "hours")
      .format("hh:mm A");
    reminderTimes.push({ id: i.toString(), time: reminderTime, enabled: true });
  }
  return reminderTimes;
};

// console.log(reminderTimes);
//function to get the closets reminders time

export const getClosestReminder = (reminderTimes) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
  let nearestReminder = null;
  let minTimeDifference = Infinity;

  for (const reminder of reminderTimes) {
    const [time, meridiem] = reminder.time.split(" ");
    const [hour, minute] = time.split(":").map(Number);

    let reminderHour = hour;
    if (meridiem === "PM" && hour < 12) {
      reminderHour += 12; // Convert PM hour to 24-hour format
    } else if (meridiem === "AM" && hour === 12) {
      reminderHour = 0; // Convert 12 AM hour to 24-hour format
    }

    const reminderTime = reminderHour * 60 + minute; // Convert reminder time to minutes

    if (reminder.enabled) {
      const timeDifference = reminderTime - currentTime;

      if (timeDifference > 0 && timeDifference < minTimeDifference) {
        nearestReminder = reminder;
        minTimeDifference = timeDifference;
      }
    }
  }
  return nearestReminder;
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
