import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg width={20} height={20} viewBox="0 0 21 39" fill="none" {...props}>
      <Path
        d="M19.342 21.938L20.406 15H13.75v-4.5c0-1.898.928-3.75 3.91-3.75h3.027V.844S17.942.375 15.316.375C9.83.375 6.25 3.698 6.25 9.713V15H.156v6.938H6.25v16.771C7.473 38.902 8.725 39 10 39s2.527-.098 3.75-.29V21.936h5.592z"
        fill="#1877F2"
      />
    </Svg>
  );
}

export default SvgComponent;
