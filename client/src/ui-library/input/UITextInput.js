// @flow
import React from 'react';
import styles from './UITextInput.scss';

type Props = {
  +value: mixed,
  +onChange: () => {},
};

class UITextInput extends React.Component<Props> {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        value={value}
        onChange={onChange}
        type="text"
        className={styles.textInput}
      />
    );
  }
}

export default UITextInput;
