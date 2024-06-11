import React, { useEffect } from 'react';
import { View, Animated, Easing, Dimensions, ViewStyle } from 'react-native';
import { styles } from './styles/styles';

type SkeletonSquareProps = {
  height?:number | string;
  width?:number | string;
  borderRadius?:number;
}

const windowWidth = Dimensions.get('window').width;

const SkeletonSquare:React.FC<SkeletonSquareProps> = ({ width, height, borderRadius }) => {
    const translateX = new Animated.Value(-100);

    useEffect(()=> {
        const animate = () => {
            Animated.sequence([
              Animated.timing(translateX, {
                toValue: 200, // Valor suficiente para cobrir a largura do seu componente
                duration: 1000, // Tempo total da animação
                easing: Easing.linear,
                useNativeDriver: true,
              }),
              Animated.timing(translateX, {
                toValue: -100, // Valor inicial
                duration: 500, // Tempo de espera entre ciclos
                easing: Easing.linear,
                useNativeDriver: true,
              }),
            ]).start(() => animate()); // Recursivamente reinicia a animação
          };
      
          animate();
      
          return () => {
            // Limpeza ao desmontar o componente
            translateX.setValue(-100);
          };
    },[]);


    return (
        <View style={[styles.item, { 
            width:width || windowWidth - 110,
            height:height || 260, 
            borderRadius: borderRadius || 0
          } as ViewStyle
        ]}>
            <Animated.View
                style={[
                    styles.skeleton,
                    {
                        opacity: translateX.interpolate({
                        inputRange: [-100, 0, 100, 200],
                        outputRange: [0, 1, 0, 0], // Define a opacidade em diferentes pontos da animação
                        
                        }),
                        transform: [{ translateX: translateX }],
                    },
                ]}
            >
            </Animated.View>
        </View>
    )
}

export { SkeletonSquare };