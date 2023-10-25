import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import {
  Pressable,
  Alert,
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
import { useLoginStore } from "../store/LoginStore";

export const Beers = ({ route }: any) => {
  const isLoginIn = useLoginStore((state) => state.isLoggedIn);

  const { jsonType } = route.params;

  const [beersData, setBeersData] = useState<BeersType[]>([]);
  useEffect(() => {
    if (jsonType === "cans") {
      const data = require("../../assets/latas_cervezas.json");
      setBeersData(data);
    } else if (jsonType === "bottles") {
      const data = require("../../assets/botellas_cervezas.json");
      setBeersData(data);
    }
  }, [jsonType]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);

  const [selectedBeer, setSelectedBeer] = useState<BeersType>();

  const [page, setPage] = useState(1);
  const pageElements = 10;
  const totalPages = Math.round(beersData.length / pageElements);
  const startIndex = (page - 1) * pageElements;
  const endIndex = startIndex + pageElements;
  const visibleData = beersData.slice(startIndex, endIndex);

  useEffect(() => {
    if(!isLoginIn){
      setPage(1);
    }
  }, [isLoginIn]);

  const nextPage = () => {
    if (page != totalPages && isLoginIn) {
      setPage(page + 1);
    } else {
      showModalLogin();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
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

  const showModalLogin = () => {
    console.log("Modal login abierto");
    if (page != totalPages) {
      setModalLoginVisible(true);
    }
  };

  const hiddenModalLogin = () => {
    console.log("Modal login cerrado");
    setModalLoginVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLoginVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Debes iniciar sesión para ver el resto del contenido
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalLoginVisible(!modalLoginVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={visibleData}
        keyExtractor={(beer) => beer.id}
        renderItem={({ item }) => (
          <BeerCard beer={item} onPress={() => showModal(item)} />
        )}
        numColumns={2}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={prevPage}>
          <Icons name="arrow-left-bold" size={30} />
        </TouchableOpacity>
        <Text>
          {page}/{totalPages}
        </Text>
        <TouchableOpacity onPress={nextPage}>
          <Icons name="arrow-right-bold" size={30} />
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
