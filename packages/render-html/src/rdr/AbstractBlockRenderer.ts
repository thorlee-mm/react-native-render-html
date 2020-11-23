import { TBlock } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';

export default abstract class AbstractBlockRenderer<
  P extends Record<string, any> = {}
> {
  public abstract RenderBlockComponent: ComponentType<P>;

  /**
   *
   *
   * @param tnode - The TBlock from which props will be extracted, or null to
   * render the default renderer.
   */
  public abstract derivePropsFromTNode(tnode: TBlock): P | null;
}
