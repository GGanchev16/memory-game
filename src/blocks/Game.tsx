import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Grid, Button, MemoryCard } from "../components";
import { GridItem, ILevel } from "../types";
import { generateGameItems } from "../utils";

import { IMAGE_MAP, GAME_TIMING, GRID_CONFIG } from "../../config/gameConfig";

interface GameProps {
  setSelectedLevel: (level: null) => void;
  selectedLevel: ILevel;
  availableImages: string[];
}

export const Game = ({
  setSelectedLevel,
  selectedLevel,
  availableImages,
}: GameProps) => {
  const [gameItems, setGameItems] = useState<GridItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<GridItem[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [canFlip, setCanFlip] = useState(true);

  const initializeGame = useCallback(() => {
    const newItems = generateGameItems(selectedLevel, availableImages);

    setIsGameWon(false);
    setFlippedCards([]);
    setGameItems(newItems);
    setCanFlip(true);
  }, [selectedLevel, availableImages]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardMatching = useCallback((card1: GridItem, card2: GridItem) => {
    const isMatch = card1.imageId === card2.imageId;

    if (isMatch) {
      setTimeout(() => {
        setGameItems((prev) =>
          prev.map((item) =>
            item.id === card1.id || item.id === card2.id
              ? { ...item, isMatched: true, isFlipped: true }
              : item
          )
        );
        setFlippedCards([]);
        setCanFlip(true);
      }, GAME_TIMING.MATCH_DELAY);
    } else {
      setTimeout(() => {
        setGameItems((prev) =>
          prev.map((item) =>
            item.id === card1.id || item.id === card2.id
              ? { ...item, isFlipped: false }
              : item
          )
        );
        setFlippedCards([]);
        setCanFlip(true);
      }, GAME_TIMING.NO_MATCH_DELAY);
    }
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlip(false);
      const [card1, card2] = flippedCards;
      handleCardMatching(card1, card2);
    }
  }, [flippedCards, handleCardMatching]);

  useEffect(() => {
    const allMatched =
      gameItems.length > 0 && gameItems.every((item) => item.isMatched);

    if (allMatched && !isGameWon) {
      setIsGameWon(true);
    }
  }, [gameItems, isGameWon]);

  const handleCardPress = useCallback(
    (itemId: string) => {
      if (!canFlip || flippedCards.length >= 2) return;

      const item = gameItems.find((i) => i.id === itemId);
      if (!item || item.isFlipped || item.isMatched) return;

      setGameItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isFlipped: true } : i))
      );

      setFlippedCards((prev) => [...prev, { ...item, isFlipped: true }]);
    },
    [canFlip, flippedCards.length, gameItems]
  );

  const handleExit = useCallback(() => {
    setSelectedLevel(null);
  }, [setSelectedLevel]);

  const renderMemoryCard = useCallback(
    (item: GridItem, index: number) => {
      return (
        <MemoryCard
          key={item.id}
          item={item}
          onPress={handleCardPress}
          canFlip={canFlip}
          imageMap={IMAGE_MAP}
        />
      );
    },
    [canFlip, handleCardPress]
  );

  return (
    <View style={styles.container}>
      <Grid
        matrix={selectedLevel.matrix}
        items={gameItems}
        renderItem={renderMemoryCard}
        gap={GRID_CONFIG.GAP}
      />

      {isGameWon ? (
        <View style={styles.winMessage}>
          <Text style={styles.winText}>🎉 You Won! 🎉</Text>
          <Text style={styles.winSubText}>Level: {selectedLevel.label}</Text>
        </View>
      ) : (
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoText}>
            Level: {selectedLevel.label} | Cards:{" "}
            {gameItems.filter((item) => item.isMatched).length}/
            {gameItems.length}
          </Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <Button label="Exit" onPress={handleExit} styles={styles.btn} />
        <Button label="Reset" onPress={initializeGame} styles={styles.btn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    width: "30%",
  },
  winMessage: {
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#E8F5E8",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  winText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 4,
  },
  winSubText: {
    fontSize: 16,
    color: "#2E7D32",
    textAlign: "center",
  },
  gameInfo: {
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
  },
  gameInfoText: {
    color: "#373737",
    fontSize: 14,
    fontWeight: "500",
  },
});
