import React from 'react';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';
import { getRendererForTagAndType } from './defaultRenderers';
import { useTChildrenRenderer } from './context/TNodeRenderersContext';
import { TDefaultRenderer, TNodeGenericRendererProps } from './shared-types';
import mergeCollapsedMargins from './mergeCollapsedMargins';
import GenericPressable from './GenericPressable';

export const TDefaultBlockRenderer: TDefaultRenderer<TBlock> = ({
  tnode,
  children: overridingChildren,
  hasAnchorAncestor,
  ...passedProps
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer tnode={tnode} hasAnchorAncestor={hasAnchorAncestor} />
  );
  if (typeof passedProps.onPress === 'function') {
    return React.createElement(GenericPressable, passedProps, children);
  }
  return React.createElement(View, passedProps, children);
};

const TBlockRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  collapsedMarginTop
}: TNodeGenericRendererProps<TBlock>) => {
  const commonProps = {
    key,
    tnode,
    style: mergeCollapsedMargins(collapsedMarginTop, {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    }),
    hasAnchorAncestor,
    untranslatedStyle: tnode.styles.webTextFlow,
    collapsedMarginTop
  };
  const Renderer = getRendererForTagAndType(tnode.tagName, 'block');
  if (Renderer) {
    return React.createElement(Renderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultBlockRenderer
    });
  }
  return React.createElement(TDefaultBlockRenderer, commonProps);
};

export default TBlockRenderer;
