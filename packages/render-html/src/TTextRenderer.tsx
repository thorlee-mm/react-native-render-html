import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-engine';
import {
  NativeTextStyles,
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeGenericRendererProps
} from './shared-types';
import { getRendererForTagAndType } from './defaultRenderers';

const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  tnode,
  hasAnchorAncestor,
  ...props
}: TDefaultRendererProps<TText>) => {
  return <Text {...props}>{tnode.data}</Text>;
};

const TTextRenderer = ({
  tnode,
  key,
  hasAnchorAncestor
}: TNodeGenericRendererProps<TText>) => {
  const commonProps: TDefaultRendererProps<TText> = {
    key: key,
    tnode: tnode,
    hasAnchorAncestor: hasAnchorAncestor,
    style: [
      tnode.styles.nativeBlockFlow,
      tnode.styles.nativeBlockRet,
      tnode.styles.nativeTextFlow,
      tnode.styles.nativeTextRet
    ] as NativeTextStyles
  };
  const Renderer = getRendererForTagAndType(tnode.tagName, 'text');
  if (Renderer) {
    return React.createElement(Renderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultTextRenderer
    });
  }
  return React.createElement(TDefaultTextRenderer, commonProps);
};

export default TTextRenderer;
