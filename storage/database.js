import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, item) => {
  try {
    const jsonValue = JSON.stringify(item);
    const result = await AsyncStorage.setItem(key, jsonValue);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getItem = (key) => {
  try {
    const data = AsyncStorage.getItem(key);
    return data || null;
  } catch (error) {
    console.log(error, "from database");
  }
};

export const clearItem = (key) => {
  return AsyncStorage.removeItem(key);
};

export const clearStorage = () => {
  return AsyncStorage.clear();
};

export const saveRecords = async (records) => {
  try {
    const recordsJSON = JSON.stringify(records);
    await AsyncStorage.setItem("records", recordsJSON);
  } catch (error) {
    console.log("Error saving records:", error);
  }
};
export const getRecords = async () => await AsyncStorage.getItem("records");

export const saveRemindingTimes = async (remindingTimes) => {
  try {
    const remindingTimesJson = JSON.stringify(remindingTimes);
    await AsyncStorage.setItem("remindingTimes", remindingTimesJson);
  } catch (error) {
    console.log(error);
  }
};

export const getRemindingTimes = async () => {
  try {
    const remindingTimesJson = await AsyncStorage.getItem("remindingTimes");
    const remindingTimes = JSON.parse(remindingTimesJson);
    return remindingTimes;
  } catch (error) {
    console.log(error);
    return null;
  }
};
