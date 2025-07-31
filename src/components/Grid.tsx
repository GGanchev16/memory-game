import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GridItem } from "../types";

interface GridProps {
  matrix: [number, number];
  items: GridItem[];
  renderItem: (item: GridItem, index: number) => React.ReactNode;
  gap?: number;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Grid = ({ matrix, items, renderItem, gap = 8 }: GridProps) => {
  const [rows, columns] = matrix;

  const availableWidth = screenWidth - 40;
  const availableHeight = screenHeight * 0.7;

  const totalHorizontalGap = (columns - 1) * gap;
  const totalVerticalGap = (rows - 1) * gap;

  const maxItemWidth = (availableWidth - totalHorizontalGap) / columns;
  const maxItemHeight = (availableHeight - totalVerticalGap) / rows;

  const itemSize = Math.min(maxItemWidth, maxItemHeight, 120);

  const renderRow = (rowIndex: number) => {
    const rowItems = items.slice(rowIndex * columns, (rowIndex + 1) * columns);

    return (
      <View key={rowIndex} style={[styles.row, { gap }]}>
        {rowItems.map((item, columnIndex) => {
          const itemIndex = rowIndex * columns + columnIndex;

          return (
            <View
              key={item.id}
              style={[
                styles.itemContainer,
                {
                  width: itemSize,
                  height: itemSize,
                },
              ]}
            >
              {renderItem(item, itemIndex)}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { gap }]}>
      {Array.from({ length: rows }, (_, index) => renderRow(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
