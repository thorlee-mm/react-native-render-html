import React from 'react';
import { Text } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsContext';
import { useTChildrenRenderer } from './context/TNodeRenderersContext';
import {
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeGenericRendererProps
} from './shared-types';
import { getRendererForTagAndType } from './defaultRenderers';
import mergeCollapsedMargins from './mergeCollapsedMargins';

const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> = ({
  tnode,
  key,
  children: overridingChildren,
  hasAnchorAncestor,
  ...passedProps
}) => {
  const TChildrenRenderer = useTChildrenRenderer();
  const children = overridingChildren ?? (
    <TChildrenRenderer
      tnode={tnode}
      disableMarginCollapsing
      hasAnchorAncestor={hasAnchorAncestor}
    />
  );
  return React.createElement(Text, passedProps, children);
};

const TPhrasingRenderer = ({
  tnode,
  key,
  hasAnchorAncestor,
  collapsedMarginTop
}: TNodeGenericRendererProps<TPhrasing>) => {
  const { allowFontScaling, textSelectable } = useSharedProps();
  const style = mergeCollapsedMargins(collapsedMarginTop, {
    ...tnode.styles.nativeBlockFlow,
    ...tnode.styles.nativeBlockRet,
    ...tnode.styles.nativeTextFlow,
    ...tnode.styles.nativeTextRet
  });
  const commonProps: TDefaultRendererProps<TPhrasing> = {
    key,
    tnode,
    style,
    allowFontScaling,
    selectable: textSelectable,
    hasAnchorAncestor
  };
  const Renderer = getRendererForTagAndType(tnode.tagName, 'phrasing');
  if (Renderer) {
    return React.createElement(Renderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultPhrasingRenderer
    });
  }
  return React.createElement(TDefaultPhrasingRenderer, commonProps);
};

export default TPhrasingRenderer;
