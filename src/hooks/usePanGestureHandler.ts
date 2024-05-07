import {Dimensions} from 'react-native';
import {
  Gesture,
  State,
  type GestureStateChangeEvent,
  type PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {width: wWidth} = Dimensions.get('screen');

type SnapPoints = {min: number; max: number};

interface IUsePanGestureHandler {
  snapPoints?: {min: number; max: number};
  onEnd?: ({x, translationX}: {x: number; translationX: number}) => void;
  onSnap?: (e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => void;
}

function usePanGestureHandler(params?: IUsePanGestureHandler) {
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

      if (params && params.snapPoints) {
        const {snapPoints} = params;

        if (
          e.translationX > snapPoints.min &&
          e.translationX <= snapPoints.max
        ) {
          translation.value = {x: e.translationX, y: e.translationY};
          velocity.value = {x: e.velocityX, y: e.velocityY};
          
        }

        if ((e.translationX >= snapPoints.max - 10 && e.translationX <= snapPoints.max) && params.onSnap)  {
          runOnJS(params.onSnap)({...e, oldState: state.value});
        }
      } else {
        translation.value = {x: e.translationX, y: e.translationY};
        velocity.value = {x: e.velocityX, y: e.velocityY};
      }

      state.value = State.ACTIVE;
    })
    .onEnd(e => {

      console.log('e.translationX', e.translationX, wWidth * 0.90, -wWidth * 0.90)
      if (e.translationX > (wWidth * 90) || (-wWidth * 0.90) > e.translationX) {
        if (params && params.onEnd) {
          runOnJS(params.onEnd)({x: e.x, translationX: e.translationX});
        }
      }
      translation.value = withSpring(
        {x: 0, y: 0},
        {stiffness: 70, overshootClamping: true},
      );
      velocity.value = {x: 0, y: 0};

      state.value = State.END;
    });

  return {gestureHandler, translation: translation, velocity: velocity, state};
}

export default usePanGestureHandler;
