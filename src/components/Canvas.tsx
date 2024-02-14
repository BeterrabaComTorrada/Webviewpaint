//teste criação de component com Skia (funcina corretamente se aplicado sozinho)

import { Children, useRef, useState } from 'react';
import { Canvas, useTouchHandler, SkPath, Skia, Path, SkPaint, PaintStyle, SkiaPictureView, SkCanvas } from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';

interface IPath {
    path: SkPath;
    paint: SkPaint;
}

const paint = () => {
    const paint = Skia.Paint();
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeWidth(3);
    paint.setColor(Skia.Color('red'));
    return paint;
}

const CanvasComponent = () => {
    const canvasRef = useRef<SkCanvas | null>(null);
    const currentPath = useRef<SkPath | null>(null);
    const [paths, setPaths] = useState<IPath[]>([]);
    const onTouch = useTouchHandler({
        onStart: ({ x, y }) => {
            currentPath.current = Skia.Path.Make()
            currentPath.current.moveTo(x, y);
        },
        onActive: ({ x, y }) => {
            currentPath.current?.lineTo(x, y);
        },
        onEnd: () => {
            setPaths(values => values.concat({
                path: currentPath.current!,
                paint: paint(),
            }));
            currentPath.current = null;
        }
    })

    

    return(
        <SkiaPictureView style={styles.container} >
            <Canvas style={styles.container} onTouch={onTouch}>
                {Children.toArray(paths.map((value) => (
                    <Path path={value.path} paint={value.paint} />
                )))}
            </Canvas>
        </SkiaPictureView>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
});

export default CanvasComponent;