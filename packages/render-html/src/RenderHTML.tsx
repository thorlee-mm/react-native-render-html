import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { RenderHTMLProps } from './shared-types';
import TNodeRenderer from './TNodeRenderer';
import useTTree from './useTTree';
import SharedPropsContext, {
  defaultSharedPropsContext
} from './context/SharedPropsContext';
import TNodeRenderersContext from './context/TNodeRenderersContext';
import TChildrenRenderer from './TChildrenRenderer';
import RenderHTMLDebug from './RenderHTMLDebug';

export type RenderHTMLPropTypes = Record<keyof RenderHTMLProps, any>;

const propTypes: RenderHTMLPropTypes = {
  renderers: PropTypes.object.isRequired,
  enableCSSInlineProcessing: PropTypes.bool,
  enableUserAgentStyles: PropTypes.bool,
  enableExperimentalMarginCollapsing: PropTypes.bool,
  idsStyles: PropTypes.object,
  remoteErrorView: PropTypes.func,
  remoteLoadingView: PropTypes.func,
  ignoredTags: PropTypes.array.isRequired,
  ignoredStyles: PropTypes.array.isRequired,
  allowedStyles: PropTypes.array,
  decodeEntities: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  listsPrefixesRenderers: PropTypes.object,
  alterData: PropTypes.func,
  alterChildren: PropTypes.func,
  alterNode: PropTypes.func,
  ignoreNode: PropTypes.func,
  html: PropTypes.string,
  uri: PropTypes.string,
  tagsStyles: PropTypes.object,
  classesStyles: PropTypes.object,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customWrapper: PropTypes.func,
  onLinkPress: PropTypes.func,
  computeImagesMaxWidth: PropTypes.func,
  staticContentMaxWidth: PropTypes.number,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  imagesInitialDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  emSize: PropTypes.number.isRequired,
  ptSize: PropTypes.number.isRequired,
  baseStyle: PropTypes.object,
  textSelectable: PropTypes.bool,
  renderersProps: PropTypes.object,
  allowFontScaling: PropTypes.bool,
  onTTreeChange: PropTypes.func,
  systemFonts: PropTypes.arrayOf(PropTypes.string),
  fallbackFonts: PropTypes.shape({
    serif: PropTypes.string,
    'sans-serif': PropTypes.string,
    monospace: PropTypes.string
  }),
  triggerTREInvalidationPropNames: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps: {
  [k in keyof RenderHTMLProps]?: RenderHTMLProps[k];
} = {
  ...defaultSharedPropsContext,
  decodeEntities: true,
  emSize: 14,
  ptSize: 1.3,
  ignoredTags: [],
  ignoredStyles: [],
  baseStyle: { fontSize: 14 },
  tagsStyles: {},
  classesStyles: {},
  enableUserAgentStyles: true,
  enableCSSInlineProcessing: true,
  renderers: {},
  fallbackFonts: {
    'sans-serif': Platform.select({ ios: 'system', default: 'sans-serif' }),
    monospace: Platform.select({ ios: 'Menlo', default: 'monospace' }),
    serif: Platform.select({ ios: 'Times New Roman', default: 'serif' })
  },
  systemFonts: Platform.select({
    default: [],
    ios: [
      'San Francisco',
      'Arial',
      'ArialHebrew',
      'Avenir',
      'Baskerville',
      'Bodoni 72',
      'Bradley Hand',
      'Chalkboard SE',
      'Cochin',
      'Copperplate',
      'Courier',
      'Courier New',
      'Damascus',
      'Didot',
      'Futura',
      'Geeza Pro',
      'Georgia',
      'Gill Sans',
      'Helvetica',
      'Helvetica Neue',
      'Hiragino Sans',
      'Hoefler Text',
      'Iowan Old Style',
      'Kailasa',
      'Khmer Sangam MN',
      'Marker Felt',
      'Menlo',
      'Mishafi',
      'Noteworthy',
      'Optima',
      'Palatino',
      'Papyrus',
      'Savoye LET',
      'Symbol',
      'Thonburi',
      'Times New Roman',
      'Trebuchet MS',
      'Verdana',
      'Zapf Dingbats',
      'Zapfino'
    ],
    android: [
      'Roboto',
      'notoserif',
      'sans-serif-light',
      'sans-serif-thin',
      'sans-serif-medium'
    ]
  }),
  triggerTREInvalidationPropNames: [],
  debug: __DEV__
};

export default function RenderHTML(props: RenderHTMLProps) {
  const ttree = useTTree(props);
  const Wrapper = props.debug ? RenderHTMLDebug : Fragment;
  return (
    <Wrapper {...props}>
      <SharedPropsContext.Provider value={props}>
        <TNodeRenderersContext.Provider
          value={{ TNodeRenderer, TChildrenRenderer }}>
          <TNodeRenderer tnode={ttree} collapsedMarginTop={null} />
        </TNodeRenderersContext.Provider>
      </SharedPropsContext.Provider>
    </Wrapper>
  );
}

RenderHTML.defaultProps = defaultProps;
RenderHTML.propTypes = propTypes;
