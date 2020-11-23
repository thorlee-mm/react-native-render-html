import React from 'react';
import { TextRenderer } from '../defaultRenderers';
import useAnchorProps from './useAnchorProps';

const AnchorTextRenderer: TextRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAnchorProps(props));
};

AnchorTextRenderer.displayType = 'text';

export default AnchorTextRenderer;
