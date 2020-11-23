import React from 'react';
import { BlockRenderer } from '../defaultRenderers';
import useAnchorProps from './useAnchorProps';

const AnchorBlockRenderer: BlockRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAnchorProps(props));
};

AnchorBlockRenderer.displayType = 'block';

export default AnchorBlockRenderer;
