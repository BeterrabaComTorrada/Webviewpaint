import React from 'react';
import { Children, useRef, useState } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Canvas, useTouchHandler, SkPath, Skia, Path, SkPaint, PaintStyle, SkiaPictureView, SkCanvas } from '@shopify/react-native-skia';
import '../public/style.css';

interface IPath {
  path: SkPath;
  paint: SkPaint;
}

// Definição da função para configurar as propriedades do pincel de desenho
const paint = () => {
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(3);
  paint.setColor(Skia.Color('red'));
  return paint;
}

const QuadroScreen = () => {

  // Referência para o canvas e para o caminho de desenho atual
  const canvasRef = useRef<SkCanvas | null>(null);
  const currentPath = useRef<SkPath | null>(null);

  // Estado para armazenar os caminhos de desenho finalizados
  const [paths, setPaths] = useState<IPath[]>([]);

  // Manipulador de toque para detectar gestos na tela
  const onTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      currentPath.current = Skia.Path.Make()
      currentPath.current.moveTo(x, y);
    },
    onActive: ({ x, y }) => {
      currentPath.current?.lineTo(x, y);
      canvasRef.current?.drawPath(currentPath.current!, paint())
    },
    onEnd: () => {
      setPaths(values => values.concat({
        path: currentPath.current!,
        paint: paint(),
      }));
      currentPath.current = null;
    }
  })

  return (
    <ImageBackground
      source={require('../assets/cenarioBg.png')}
      style={styles.backgroundImage}
    >
      <SkiaPictureView style={styles.containerCanvas}>
        <Canvas style={styles.containerCanvas2} onTouch={onTouch}>
          {Children.toArray(paths.map((value) => (
            <Path path={value.path} paint={value.paint} />
          )))}
        </Canvas>
      </SkiaPictureView>

      <View style={styles.container}>
        <View style={styles.containerButtons}>
          <TouchableOpacity onPress={() => console.log('AtivCP2')} style={styles.buttonNavigation}>
            <Image source={require('../assets/btnVoltar.png')} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Home')} style={styles.buttonNavigation}>
            <Image source={require('../assets/btnHome.png')} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('audiodescrição')} style={styles.buttonNavigation}>
            <Image source={require('../assets/btnSom.png')} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('download')} style={styles.buttonNavigation}>
            <Image source={require('../assets/btnDownload.png')} style={styles.button} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerTools}>
          <Image source={require('../assets/ferramentasGroup.png')} style={{ width: 83, height: 220 }} />
          <View style={styles.overlayImageTools}>
            <TouchableOpacity onPress={() => console.log('pincel')}>
              <Image source={require('../assets/btnPincel.png')} style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('spray')}>
              <Image source={require('../assets/btnSpray.png')} style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('balde')}>
              <Image source={require('../assets/btnBalde.png')} style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('borracha')}>
              <Image source={require('../assets/btnBorracha.png')} style={styles.button} />
            </TouchableOpacity>
          </View>
        </View>

        <Image source={require('../assets/topBoard.png')} style={styles.topBoardImg} />

        <Image source={require('../assets/bottomBoard.png')} style={styles.bottomBoardImg} />

        <Image source={require('../assets/pintor.png')} style={styles.personagemImg} />

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    marginTop: 15,
  },
  container: {
    flex: 1,
    marginTop: 10,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  containerButtons: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0)',
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
    width: 60,
    height: 230,
  },
  button: {
    width: 50,
    height: 50,
  },
  buttonNavigation: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 60,
    width: 50,
    height: 50,
  },
  containerTools: {
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0)',
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
    width: 91,
    height: 227,
  },
  overlayImageTools: {
    position: 'absolute',
    top: 3,
    left: 5,
    width: 100,
    height: 100,
    gap: 3
  },
  canvasBg: {
    position: 'absolute',
    top: 40,
    left: 80,
    width: 900,
    height: 454,
    borderWidth: 3,
    borderColor: 'white'
  },
  topBoardImg: {
    position: 'absolute',
    top: 0,
    left: 280,
    width: 450,
    height: 30,
  },
  bottomBoardImg: {
    position: 'absolute',
    top: 480,
    left: 100,
    width: 800,
    height: 45,
  },
  personagemImg: {
    position: 'absolute',
    top: 350,
    left: 800,
    width: 180,
    height: 300,
  },
  containerCanvas: {
    width: 900,
    height: 454,
    backgroundColor: "white",
    position: 'absolute',
    left: 80,
    top: 40,
  },
  containerCanvas2: {
    flex: 1,
    backgroundColor: "white",
    position: 'absolute',
  }
});

export default QuadroScreen;
