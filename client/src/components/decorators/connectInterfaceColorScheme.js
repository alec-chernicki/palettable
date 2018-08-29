// @flow
import React from 'react';
import Color from 'color';

type Props = {
  color: Object,
};

const connectInterfaceColorScheme = Component => {
  class InterfaceColorSchemeHOC extends React.Component<Props> {
    render() {
      const {
        color: { hexCode },
      } = this.props;
      const colorObject = Color(hexCode);
      const black = Color('#333');
      const white = Color('#FFF');

      const interfaceColor = colorObject.dark()
        ? colorObject.mix(white)
        : colorObject.mix(black);

      const newProps = {
        accentHexCode: interfaceColor.hex(),
        isDark: colorObject.dark(),
      };

      return <Component {...this.props} {...newProps} />;
    }
  }

  return InterfaceColorSchemeHOC;
};

export default connectInterfaceColorScheme;
