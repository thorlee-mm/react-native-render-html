import AbstractMixedRenderer from './AbstractMixedBlockRenderer';

export default class AnchorRenderer extends AbstractMixedRenderer<{}> {
  RenderBlockComponent = () => null;
  RenderPhrasingComponent = () => null;

  derivePropsFromTBlock() {
    return {};
  }

  derivePropsFromTPhrasing() {
    return {};
  }
}
