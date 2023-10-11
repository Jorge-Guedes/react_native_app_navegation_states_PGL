import {
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { BeersType } from "../utils/types";
import {styles} from "../utils/styles";

interface BeerCardProps {
  beer: BeersType;
  onPress: () => void;
}

export const BeerCard = ({ beer, onPress }:BeerCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{beer.name}</Text>
      <Image source={{ uri: beer.img }} style={styles.image} />
    </TouchableOpacity>
  );
};

