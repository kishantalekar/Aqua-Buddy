import { View, Text, FlatList, Platform, ScrollView } from "react-native";
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
  {
    /* <FlatList
          data={displayTodaysRecord}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
        /> */
  }
  return (
    <View style={{ marginHorizontal: 15, flex: 1, marginBottom: 40 }}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {displayTodaysRecord?.map((record) => (
            <ListRecord item={record} key={record.id} />
          ))}
        </ScrollView>
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
