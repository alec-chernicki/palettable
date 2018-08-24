import * as React from 'react';
import classNames from 'classnames';
import styles from './UIFlex.scss';

type Props = {
  +children?: React.Node,
  +style?: Object,
  +className?: string,
  +align: string,
  +justify: string,
  +direction: string,
  +wrap: string,
};

const UIFlex = ({
  children,
  align,
  justify,
  direction,
  wrap,
  style,
  className,
}: Props) => {
  const styleProp = {
    ...style,
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    flexWrap: wrap,
  };

  return (
    <div style={styleProp} className={classNames(className, styles.flex)}>
      {children}
    </div>
  );
};

export default UIFlex;
