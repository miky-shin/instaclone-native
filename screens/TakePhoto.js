import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Alert, Image, StatusBar, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  margin-left: 60px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 20px;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashmode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const oncameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashmode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashmode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashmode(Camera.Constants.FlashMode.off);
    }
  };
  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => setTakenPhoto("");
  const goToUpload = async (save) => {
    if (save) {
      //save
      //const asset = await MediaLibrary.createAssetAsync(takenPhoto);
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    //go to upload
  };
  const onUpload = () => {
    Alert.alert("save photo", "save photo & upload or just upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity onPress={onFlashChange}>
                <Ionicons
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : ""
                  }
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={oncameraSwitch}>
                <Ionicons
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dissmiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </Actions>
      )}
    </Container>
  );
}
