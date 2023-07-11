import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { DrinkWaterReport, ListRecord, RecordsTable } from "../../components";
import { FlatList } from "react-native";
import { last30DaysRecords, last7DaysRecords } from "../../utils/helper";

import Suggestions from "../../components/Suggestions";

const LogScreen = ({ route }) => {
  const { records: initialRecordsArray } = route.params;
  const [records, setRecords] = useState(initialRecordsArray);
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const contentRef = useRef(null);
  const handleRecord = (index) => {
    if (index === 1) {
      const data = last7DaysRecords(records);
      setRecords(data);
    } else if (index == 2) {
      const data = last30DaysRecords(records);
      setRecords(data);
    } else {
      setRecords(records);
    }
  };
  const loadInitialRecords = () => {
    // Assuming you have the initial records array
    const initialRecords = initialRecordsArray;

    setRecords(initialRecords);
    setDisplayedRecords(initialRecords.slice(0, 8));
  };
  const loadMoreRecords = () => {
    const currentLength = displayedRecords.length;
    const remainingRecords = records.slice(currentLength, currentLength + 10);
    setDisplayedRecords((prev) => [...prev, ...remainingRecords]);
    // Scroll to the end of the records
    scroll();
  };
  const scroll = () => {
    if (contentRef.current) {
      contentRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    loadInitialRecords();
  }, []);

  return (
    <View style={{ marginTop: 40, paddingHorizontal: 20, flex: 1 }}>
      <DrinkWaterReport records={records} />
      <View>
        <View
          style={{
            borderBottomWidth: 0.8,
            borderColor: "gray",
            marginTop: 15,
          }}
        ></View>
        <RecordsTable records={records} handleRecord={handleRecord} />
        <View
          style={{
            borderBottomWidth: 0.8,
            borderColor: "gray",
            marginTop: 15,
            marginBottom: 10,
          }}
        ></View>
      </View>
      <View style={{ flex: 3 }}>
        {displayedRecords.length > 0 ? (
          <>
            <FlatList
              ref={contentRef}
              data={displayedRecords}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View ref={contentRef} />}
            />
            <TouchableOpacity onPress={() => loadMoreRecords()}>
              <Text
                style={{
                  color: "#5bacfe",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 2,

                  textAlign: "right",
                  paddingRight: 20,
                }}
              >
                See more...
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
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
      <View style={{ flex: 1 }}>
        <Suggestions />
      </View>
    </View>
  );
};
const renderItem = ({ item }) => {
  return <ListRecord item={item} />;
};

export default LogScreen;
