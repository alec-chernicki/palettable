// @flow
import ExportAsImageButton from './selectionButtons/ExportAsImageButton';
import ExportButtonUrl from './selectionButtons/ExportAsUrlButton';

import ExportAsImageScreen from './selectedScreens/ExportAsImageScreen';
import ExportAsUrlScreen from './selectedScreens/ExportAsUrlScreen';

import exportOptionsKeys from './exportOptionsKeys';

export default {
  [exportOptionsKeys.URL]: {
    ButtonComponent: ExportButtonUrl,
    ContentComponent: ExportAsUrlScreen,
  },
  [exportOptionsKeys.IMAGE]: {
    ButtonComponent: ExportAsImageButton,
    ContentComponent: ExportAsImageScreen,
  },
};
