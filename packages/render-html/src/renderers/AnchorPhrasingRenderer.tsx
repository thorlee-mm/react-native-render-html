import React from 'react';
import { PhrasingRenderer } from '../defaultRenderers';
import useAnchorProps from './useAnchorProps';

const AnchorPhrasingRenderer: PhrasingRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAnchorProps(props));
};

AnchorPhrasingRenderer.displayType = 'phrasing';

export default AnchorPhrasingRenderer;
