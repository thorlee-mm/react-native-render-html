import type {
  TBlock,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import React, { ComponentType } from 'react';
import { Text } from 'react-native';
import lookupRecord from './lookupRecord';
import AnchorBlockRenderer from './renderers/AnchorBlockRenderer';
import AnchorPhrasingRenderer from './renderers/AnchorPhrasingRenderer';
import AnchorTextRenderer from './renderers/AnchorTextRenderer';
import ImageRenderer from './renderers/ImageRenderer';
import ListRenderer from './renderers/ListRenderer';
import type { RendererProps } from './shared-types';

export type BlockRenderer = ComponentType<RendererProps<TBlock>> & {
  displayType: 'block';
};

export type TextRenderer = ComponentType<RendererProps<TText>> & {
  displayType: 'text';
};

export type PhrasingRenderer = ComponentType<RendererProps<TPhrasing>> & {
  displayType: 'phrasing';
};

export type DisplayType = 'phrasing' | 'text' | 'block';

type Renderer<T extends DisplayType = DisplayType> = T extends 'block'
  ? BlockRenderer
  : T extends 'text'
  ? TextRenderer
  : T extends 'phrasing'
  ? PhrasingRenderer
  : never;

type MixedRendererDeclaration = {
  [k in DisplayType]: Renderer<k>;
};

type RendererDeclaration = Renderer | MixedRendererDeclaration;
export interface DefaultRenderers {
  block: Record<string, BlockRenderer>;
  text: Record<string, () => string>;
}

const LineBreakRenderer: TextRenderer = function BreakRenderer() {
  return <Text>{'\n'}</Text>;
};

LineBreakRenderer.displayType = 'text';

const WordBreakRenderer: TextRenderer = function BreakRenderer() {
  return <Text>{'\u200b'}</Text>;
};

WordBreakRenderer.displayType = 'text';

function isMixedRendererDeclaration(
  candidate: any
): candidate is MixedRendererDeclaration {
  return !!candidate && typeof candidate === 'object';
}

export const nextDefaultRenderers: Record<string, RendererDeclaration> = {
  img: ImageRenderer,
  ul: ListRenderer,
  ol: ListRenderer,
  br: LineBreakRenderer,
  wbr: WordBreakRenderer,
  a: {
    block: AnchorBlockRenderer,
    phrasing: AnchorPhrasingRenderer,
    text: AnchorTextRenderer
  }
};

export function getRendererForTagAndType<T extends DisplayType>(
  tagName: string | null,
  displayType: T
): Renderer<T> | null {
  if (lookupRecord(nextDefaultRenderers, tagName)) {
    const renderer = nextDefaultRenderers[tagName];
    if (isMixedRendererDeclaration(renderer)) {
      // @ts-ignore
      return renderer[displayType] || null;
    } else if (renderer.displayType !== displayType) {
      __DEV__ &&
        console.warn(
          `You are attempting to render ${tagName}, but the registered renderer is of display type ${renderer.displayType} instead of ${displayType}.`
        );
    }
    // @ts-ignore
    return renderer || null;
  }
  return null;
}
