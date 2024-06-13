import React, { useEffect } from 'react';
import { View, Animated, Easing, Dimensions, ViewStyle } from 'react-native';
import { styles } from './styles/styles';

type SkeletonCardsProps = {
  heightListra?:number | string;

  heightPrimeiraListra?: number;
  heightSegundaListra?: number;

  widthPrimeiraListra?:number | string;
  paddingTopCard?: number,
  borderRadius?:number;
  paddingVerticalCard?: number;
  paddingHorizontalCard?: number;
  marginBottomPrimeiraListra?: number;
  listraSecundaria?: boolean;
  widthListraSecundaria?: number | string;
  marginBottonListraSecundaria?: number;
  qtdRepedicao?: number;
}

const windowWidth = Dimensions.get('window').width;

const SkeletonCards:React.FC<SkeletonCardsProps> = ({ 
  widthPrimeiraListra,
  heightListra,

  heightPrimeiraListra,
  heightSegundaListra,

  borderRadius,
  paddingHorizontalCard = 0,
  paddingVerticalCard = 0 ,
  marginBottomPrimeiraListra = 0,
  listraSecundaria = false,
  widthListraSecundaria = '100%',
  marginBottonListraSecundaria = 0,
  qtdRepedicao = 1,
  paddingTopCard = 0
}) => {
  const AnimatedValue = new Animated.Value(0);

    useEffect(()=>{
        Animacao();
    },[])

    const Animacao = () => {
        AnimatedValue.setValue(0);

        Animated.timing(
            AnimatedValue,
            {
                toValue:1,
                duration:350,
                useNativeDriver:false,
            }
        ).start(()=> {
            setTimeout(()=> {
                Animacao()
            },800)
        })
    }

    const translateX = AnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[-10,200]
    })

    const Listras = () => {
      const items = [];
      for (let i = 0; i < qtdRepedicao; i++) {
        items.push(
          <View
            key={`primary-${i}`}
            style={[styles.item, {
              width: widthPrimeiraListra || windowWidth - 110,
              height: heightPrimeiraListra? heightPrimeiraListra : heightListra || 20,
              borderRadius: borderRadius || 0,
              marginBottom: marginBottomPrimeiraListra,
            } as ViewStyle]}
          >
            <Animated.View style={{
              width: '30%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: '#fff',
              transform: [{ translateX: translateX }]
            }}></Animated.View>
          </View>
        );
  
        if (listraSecundaria) {
          items.push(
            <View
              key={`secondary-${i}`}
              style={[styles.item, {
                width: widthListraSecundaria || windowWidth - 110,
                height: heightSegundaListra? heightSegundaListra : heightListra || 20,
                borderRadius: borderRadius || 0,
                marginBottom: marginBottonListraSecundaria,
                flexDirection:'row'
              } as ViewStyle]}
            >
              <Animated.View style={{
                width: '30%',
                height: '100%',
                opacity: 0.5,
                backgroundColor: '#fff',
                transform: [{ translateX: translateX }]
              }}></Animated.View>
              
            </View>
          );
        }
      }
      return items;
    }


    return (
      <View style={[styles.card, {paddingVertical: paddingVerticalCard, paddingHorizontal:paddingHorizontalCard, paddingTop: paddingTopCard}]}>
        {Listras()}
      </View>
    )
}

export { SkeletonCards };