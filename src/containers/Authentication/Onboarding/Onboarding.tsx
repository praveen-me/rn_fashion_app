import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import Slide, {SLIDE_HEIGHT} from './Slide';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import SubSlide from './SubSlide';
import Dot from '../../../components/Dot';
import {Theme, useTheme} from '../../../contants/theme';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';
import makeStyles from '../../../lib/makeStyles';

const {width} = Dimensions.get('window');

const slides = [
  {
    title: 'Relaxed',
    color: '#BFEAF5',
    subTitle: 'Find your Outfits',
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    picture: {
      src: require('../../../assets/images/1.png'),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: 'Playful',
    color: '#BEECC4',
    subTitle: 'Hear it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe? Explore hundreds of the outfit ideas',
    picture: {
      src: require('./../../../assets/images/2.png'),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: 'Excentric',
    color: '#FFEAD9',
    subTitle: 'Your Style, Your Way',
    description:
      'Create your individual & unique style and look amazing everyday',
    picture: {
      src: require('./../../../assets/images/3.png'),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: 'Funky',
    color: '#FFDDDD',
    subTitle: 'Look Good, Feel Good',
    description:
      'Discover the latest trends in fashion and explore your personality',
    picture: {
      src: require('./../../../assets/images/4.png'),
      width: 1757,
      height: 2551,
    },
  },
];

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    slider: {
      height: SLIDE_HEIGHT,
      borderBottomRightRadius: theme.borderRadii.xl,
    },
    footer: {
      flex: 1,
    },
    footerContent: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: theme.borderRadii.xl,
    },
    pagination: {
      ...StyleSheet.absoluteFillObject,
      height: theme.borderRadii.xl,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    footerSlides: {
      width: width * slides.length,
      flexDirection: 'row',
    },
    underlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderBottomRightRadius: theme.borderRadii.xl,
    },
  };
});

const Onboarding = ({navigation}: AuthNavigationProps<'Onboarding'>) => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    x.value = event.contentOffset.x;
  });
  const theme = useTheme();

  const styles = useStyles();

  const animatedBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        x.value,
        slides.map((_, i) => i * width),
        slides.map(slide => slide.color),
        'RGB',
      ),
    };
  });

  // Use derived value to compute the multiplication
  const translateX = useDerivedValue(() => {
    return x.value * -1;
  });

  const currentIndex = useDerivedValue(() => {
    return x.value / width;
  });

  const onPress = (index: number) => {
    if (scroll.current) {
      scroll.current.scrollTo({x: width * (index + 1), animated: true});
    }
  };

  function onNextSlide(index: number, last: boolean) {
    if (last) {
      navigation.navigate('Welcome');
    } else {
      onPress(index);
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedBackgroundColor]}>
        {slides.map(({picture}, index) => {
          const animatedStyles = useAnimatedStyle(() => {
            return {
              opacity: interpolate(
                x.value,
                [(index - 0.5) * width, index * width, (index + 0.5) * width],
                [0, 1, 0],
              ),
            };
          });

          return (
            <Animated.View
              style={[styles.underlay, animatedStyles]}
              key={index}
            >
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height:
                    ((width - theme.borderRadii.xl) * picture.height) /
                    picture.width,
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={scrollHandler}
        >
          {slides.map((slide, index) => (
            <Slide key={index} label={slide.title} right={Boolean(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            ...animatedBackgroundColor,
          }}
        />
        <Animated.View style={[styles.footerContent]}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{index}} />
            ))}
          </View>

          <Animated.View
            style={[
              styles.footerSlides,
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          >
            {slides.map(({description, subTitle}, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  key={index}
                  {...{description, subTitle}}
                  last={last}
                  onPress={() => {
                    onNextSlide(index, last);
                  }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
