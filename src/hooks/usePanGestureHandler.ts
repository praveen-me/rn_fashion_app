import {Dimensions} from 'react-native';
import {Gesture, State} from 'react-native-gesture-handler';
import {runOnJS, useSharedValue, withSpring} from 'react-native-reanimated';

const {width: wWidth} = Dimensions.get('screen');

function usePanGestureHandler(cb: () => void) {
  const translation = useSharedValue({x: 0, y: 0});
  const velocity = useSharedValue({x: 0, y: 0});
  const state = useSharedValue(State.UNDETERMINED);

  const gestureHandler = Gesture.Pan()
    .onStart(e => {
      translation.value = {x: e.translationX, y: e.translationY};
      velocity.value = {x: e.velocityX, y: e.velocityY};
      state.value = State.BEGAN;
    })
    .onChange(e => {
      translation.value = {x: e.translationX, y: e.translationY};
      velocity.value = {x: e.velocityX, y: e.velocityY};

      state.value = State.ACTIVE;
    })
    .onEnd(e => {
      if (e.translationX > wWidth || -wWidth > e.translationX) {
        runOnJS(cb)();
      }
      translation.value = withSpring({x: 0, y: 0});
      velocity.value = {x: 0, y: 0};

      state.value = State.END;
    });

  return {gestureHandler, translation: translation, velocity: velocity, state};
}

export default usePanGestureHandler;
