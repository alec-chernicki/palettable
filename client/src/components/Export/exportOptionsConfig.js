// @flow
import ExportButtonImage from './ExportButtons/ExportButtonImage';
import ExportButtonUrl from './ExportButtons/ExportButtonUrl';
import ExportContentImage from './ExportContent/ExportContentImage';
import ExportContentUrl from './ExportContent/ExportContentUrl';
import exportOptionsKeys from './exportOptionsKeys';

export default {
  [exportOptionsKeys.URL]: {
    ButtonComponent: ExportButtonUrl,
    ContentComponent: ExportContentUrl,
  },
  [exportOptionsKeys.IMAGE]: {
    ButtonComponent: ExportButtonImage,
    ContentComponent: ExportContentImage,
  },
};
