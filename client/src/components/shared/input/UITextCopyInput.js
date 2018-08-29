// @flow
import React from 'react';
import styles from './UITextCopyInput.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
  +value: mixed,
  +onChange: () => {},
};

class UITextCopyInput extends React.Component<Props> {
  static defaultProps = {
    onChange: () => {},
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <div className={styles.textCopyInputContainer}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          className={styles.textCopyInput}
        />
        <CopyToClipboard text={value}>
          <button className={styles.copyButton}>Copy</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default UITextCopyInput;
