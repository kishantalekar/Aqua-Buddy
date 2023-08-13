import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

import {
  Header,
  CircularProgressBar,
  ProgressData,
  RecordComponent,
} from "../../components";

import { useEffect, useState } from "react";
import {
  getItem,
  getRecords,
  saveRecords,
  setItem,
} from "../../storage/database";
import {
  ACTIVITY_KEY,
  GENDER_KEY,
  PROGRESS_KEY,
  WEIGHT_KEY,
} from "../../constants/storage";
import { calcDailyGoal } from "../../utils/Drink";
import AddWater from "../../components/AddWater";
import { generateRandomId, getDisplayTime, getTime } from "../../utils/helper";
import Suggestions from "../../components/Suggestions";
// import UIModal from "../../components/UI/UIModal";

const HomeScreen = ({ logout }) => {
  const [dailyGoal, setDailyGoal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [records, setRecords] = useState([]);

  //getting userInfo
  useEffect(() => {
    const loadData = async () => {
      const weight = await getItem(WEIGHT_KEY);
      const activity = await getItem(ACTIVITY_KEY);
      const calcDailyIntake = calcDailyGoal(weight, activity);
      setDailyGoal(calcDailyIntake);

      // console.log(typeof progressFromDB, "db");

      setProgress(0);
    };
    loadData();
    calcPercentage();
  }, []);

  useEffect(() => {
    loadRecords();
  }, []);

  const calcPercentage = () => {
    const numerator = progress || 0;
    const denominator = dailyGoal || 0;

    if (denominator === 0) {
      setPercentage(0);
    } else if (numerator >= denominator) {
      setPercentage(100);
    } else {
      const calculatedPercentage = (numerator / denominator) * 100;
      setPercentage(calculatedPercentage.toFixed(0));
    }
  };

  useEffect(() => {
    //calculating percentage
    calcPercentage();
  }, [progress]);
  const loadRecords = async () => {
    try {
      const recordsJSON = await getRecords();
      if (recordsJSON) {
        const loadedRecords = JSON.parse(recordsJSON);
        setRecords(loadedRecords);
        // console.log("Records loaded successfully!");
      }
    } catch (error) {
      console.log("Error loading records:", error);
    }
  };

  const handleProgress = async () => {
    if (progress < dailyGoal) {
      setProgress((prevProgress) => prevProgress + 200);

      const time = getTime();
      const id = generateRandomId();
      const displayTime = getDisplayTime();

      addRecord(200, time, id, displayTime);
    } else {
      alert("You have completed your goal");
    }
  };
  const addRecord = (ml, time, id, displayTime) => {
    const newRecord = { id, ml, time, displayTime };
    setRecords((prev) => [newRecord, ...prev]);

    saveRecords([newRecord, ...records]);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {/* top container start */}
        <Header />
        {/* top container end */}
        <ScrollView>
          <Suggestions />
          {/* progress start */}
          <View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgressBar
                  percentage={percentage}
                  radius={140}
                  strokeWidth={12}
                  color="#199AFE"
                  // color="#c9e4f7"
                >
                  {/* Additional components */}
                  <ProgressData
                    dailyGoal={dailyGoal}
                    progress={progress}
                    percentage={percentage}
                    handleProgress={handleProgress}
                  />
                </CircularProgressBar>
              </View>
              <AddWater handleClick={handleProgress} />
            </View>
            {/* Record end */}
          </View>
          <RecordComponent records={records} />
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    backgroundColor: "gray",
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#1a9aff",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
export default HomeScreen;
