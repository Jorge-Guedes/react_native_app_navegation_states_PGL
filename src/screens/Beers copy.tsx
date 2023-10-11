import React, { useRef, useState } from "react";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import {
  FlatList,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { BeerCard } from "../components/BeerCard";
import { styles } from "../utils/styles";
import { BeersType } from "../utils/types";

const beersData: BeersType[] = require("../../assets/botellas_cervezas.json");

export const Beers = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedBeer, setSelectedBeer] = useState<BeersType>();

  const [page, setPage] = useState(1);
  const pageElements = 10;
  const totalPages=Math.round(beersData.length/pageElements);
  const startIndex=(page-1)*pageElements;
  const endIndex=startIndex+pageElements;
  const visibleData = beersData.slice(startIndex,endIndex);

  const nextPage = () => {
    if(page!=totalPages){
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if(page>1){
      setPage(page - 1);
    };
  };

  const showModal = (beer: BeersType) => {
    console.log("Modal abierto", beer.name);
    setSelectedBeer(beer);
    setModalVisible(true);
  };

  const hiddenModal = () => {
    console.log("Modal cerrado");
    setModalVisible(false);
  };

  return (
    <View style={{flex:1}}>
      <FlatList
        data={visibleData}
        keyExtractor={(beer) => beer.id}
        renderItem={({ item }) => (
          <BeerCard beer={item} onPress={() => showModal(item)} />
        )}
        numColumns={2}
      />

      <View style={{flexDirection:"row",justifyContent:"space-between", padding:10}}>
        <TouchableOpacity onPress={prevPage}>
          <Icons name="arrow-left-bold" size={30} />
        </TouchableOpacity>
        <Text>{page}/{totalPages}</Text>
        <TouchableOpacity onPress={nextPage}>
          <Icons name="arrow-right-bold" size={30}/>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={hiddenModal}>
            <Text style={styles.title}>{selectedBeer?.name}</Text>
            <Image source={{ uri: selectedBeer?.img }} style={styles.image} />
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Estilo: </Text>
              <Text style={styles.tag}>{selectedBeer?.category}</Text>
            </Text>
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Color: </Text>
              <Text style={styles.tag}>{selectedBeer?.color}</Text>
            </Text>
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Origen: </Text>
              <Text style={styles.tag}>{selectedBeer?.origin}</Text>
            </Text>
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Tipo: </Text>
              <Text style={styles.tag}>{selectedBeer?.beerType}</Text>
            </Text>
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Tono: </Text>
              <Text style={styles.tag}>{selectedBeer?.beerTone}</Text>
            </Text>
            <Text style={styles.tagContainer}>
              <Text style={styles.tagTitle}>Alcohol: </Text>
              <Text style={styles.tag}>{selectedBeer?.alcohol}</Text>
            </Text>

            <Text style={{ marginTop: 20, fontWeight: "bold" }}>
              Descripción:
            </Text>
            <Text>{selectedBeer?.description}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
