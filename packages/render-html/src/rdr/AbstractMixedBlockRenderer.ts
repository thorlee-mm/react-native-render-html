import { TBlock, TPhrasing } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';

export default abstract class AbstractMixedRenderer<
  I extends Record<string, any> = {},
  B extends Record<string, any> = {}
> {
  public abstract RenderBlockComponent: ComponentType<B>;
  public abstract RenderPhrasingComponent: ComponentType<I>;

  /**
   * Create props from a TBlock node.
   *
   * @param tnode - The TBlock from which props will be extracted, or null to
   * render the default renderer.
   */
  public abstract derivePropsFromTBlock(tnode: TBlock): B | null;

  /**
   * Create props from a TPhrasing node.
   *
   * @param tnode - The TPhrasing from which props will be extracted, or null to
   * render the default renderer.
   */
  public abstract derivePropsFromTPhrasing(tnode: TPhrasing): B | null;
}
