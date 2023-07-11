export const calcDailyGoal = (weight, activity) => {
  const kgToPounds = weight * 2.2046;
  const waterPerDay = kgToPounds * (2 / 3); //ounces of water per day.
  const extraWater = (activity / 30) * 12;

  const totalWaterPerDay = (waterPerDay + extraWater) * 0.0295735; //To convert ounces in liters we need to multiply by 0.0295735
  return (Math.round((totalWaterPerDay + Number.EPSILON) * 100) / 100) * 1000; // in ml
};
