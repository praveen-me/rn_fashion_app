import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import RoundedIcon from '../../../components/RoundedIcon';
import {Box} from '../../../contants/theme';

interface OutfitProps {
  color: string;
  aspectRatio: number;
  id: number;
  width: number;
  onPress: () => void;
  outfit?: {selected: boolean};
}

const Outfit = ({
  color: backgroundColor,
  aspectRatio,
  width,
  outfit,
}: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  const _onSelect = () => {
    if (outfit) {
      outfit.selected = !selected;
    }
    setSelected((prevState) => !prevState);
  };

  return (
    <TouchableOpacity onPress={_onSelect}>
      <Box
        borderRadius="m"
        marginTop="m"
        alignItems="flex-end"
        padding="s"
        style={{
          backgroundColor,
          width,
          height: width * aspectRatio,
        }}>
        {selected && (
          <RoundedIcon
            name="check"
            color={'#fff'}
            backgroundColor="primatyBtnBg"
            size={24}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default Outfit;
