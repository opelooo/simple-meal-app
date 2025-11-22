import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";

function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <Text style={styles.subtitle}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <Text key={ingredient} style={styles.listItem}>
          {ingredient}
        </Text>
      ))}
      <Text style={styles.subtitle}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <Text key={step} style={styles.listItem}>
          {step}
        </Text>
      ))}
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({});
