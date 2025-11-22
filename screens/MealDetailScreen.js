import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";

function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
      <Text>{selectedMeal.title}</Text>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({

});
