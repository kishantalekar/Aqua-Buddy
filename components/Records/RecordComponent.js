import { View, Text, FlatList, Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import ListRecord from "./ListRecord";
import ReminderComponent from "../ReminderComponent";
import { useNavigation } from "@react-navigation/native";
import { todayRecords } from "../../utils/helper";

const RecordComponent = ({ records }) => {
  const [displayTodaysRecord, setDisplayTodaysRecord] = useState([]);

  const navigate = useNavigation();

  useEffect(() => {
    const data = todayRecords(records);
    setDisplayTodaysRecord(data);
  }, [records]);
  return (
    <View style={{ marginHorizontal: 15, flex: 1, marginBottom: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: "#5bacfe",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Today's Record
        </Text>
        <Text
          onPress={() =>
            navigate.navigate("log", {
              records: records,
            })
          }
          style={{
            color: "#5bacfe",
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 10,
            marginRight: 20,
            marginTop: 5,
            textDecorationLine: "underline",
          }}
        >
          See logs
        </Text>
      </View>
      <ReminderComponent />
      {/* records start */}
      {displayTodaysRecord.length > 0 ? (
        <FlatList
          data={displayTodaysRecord}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            No Records available
          </Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({ item }) => {
  return <ListRecord item={item} />;
};
export default RecordComponent;
