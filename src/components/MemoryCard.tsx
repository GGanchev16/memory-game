import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { GridItem } from "../types";

interface MemoryCardProps {
  item: GridItem;
  onPress: (id: string) => void;
  canFlip: boolean;
  imageMap: { [key: string]: any };
}

export const MemoryCard = ({
  item,
  onPress,
  canFlip,
  imageMap,
}: MemoryCardProps) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const isCardDisabled = !canFlip || item.isFlipped || item.isMatched;

  useEffect(() => {
    if (item.isFlipped || item.isMatched) {
      Animated.parallel([
        Animated.timing(flipAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnimation, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(flipAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [item.isFlipped, item.isMatched, flipAnimation, scaleAnimation]);

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "0deg"],
        }),
      },
      { scale: scaleAnimation },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
      { scale: scaleAnimation },
    ],
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(item.id)}
      disabled={isCardDisabled}
      activeOpacity={isCardDisabled ? 1 : 0.7}
    >
      <Animated.View style={[styles.card, styles.cardFace, backAnimatedStyle]}>
        <View style={styles.cardBack}>
          <Text style={styles.cardBackText}>Yara</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          styles.cardFace,
          item.isFlipped && !item.isMatched && styles.flippedCard,
          item.isMatched && styles.matchedCard,
          frontAnimatedStyle,
        ]}
      >
        <Image
          source={imageMap[item.imageId]}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    backfaceVisibility: "hidden",
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  flippedCard: {
    borderColor: "#2196F3",
  },
  matchedCard: {
    opacity: 0.7,
    borderColor: "#4CAF50",
  },
  cardImage: {
    width: "80%",
    height: "80%",
  },
  cardBack: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBackText: {
    color: "#373737",
    fontSize: 12,
    fontWeight: "500",
  },
});
