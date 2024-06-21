import React from 'react';
import { View } from 'react-native';
import { styles } from './styles/styles';
import { SkeletonCards } from '../../../../../components/SkeletonCards';
import { SkeletonSquare } from '../../../../../components/SkeletonSquare';

const Skeleton = () => {

  const ExibeCards = () => {
    const qtdCards = 2
    const cards = [];
    for (let i = 0; i < qtdCards; i++) {
      cards.push(
        <SkeletonCards 
          key={i}
          paddingHorizontalCard={20}
          borderRadius={30}
          heightListra={20}
          paddingTopCard={10}
          widthPrimeiraListra={'30%'}
          marginBottomPrimeiraListra={5}
          listraSecundaria 
          widthListraSecundaria={'70%'}
          marginBottonListraSecundaria={20}
          // paddingVerticalCard={5}
          qtdRepedicao={2}
        />
      );
    }
    return cards;
  }

  return (
    <View style={[styles.card]}>
      <SkeletonSquare height={60} width={'100%'}/>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {ExibeCards()}
        {ExibeCards()}
        {ExibeCards()}
      </View>

      <SkeletonSquare height={30} width={'100%'}/>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>

        {ExibeCards()}
        {ExibeCards()}
      </View>

      <SkeletonSquare height={30} width={'100%'}/>
      {ExibeCards()}
    </View>
  );
}

export { Skeleton };
