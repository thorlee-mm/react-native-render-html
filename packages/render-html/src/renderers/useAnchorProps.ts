import { TNode } from '@native-html/transient-render-engine';
import { useSharedProps } from '../context/SharedPropsContext';
import extractAnchorOnLinkPress from '../extractAnchorOnLinkPress';
import { GenericPressableProps } from '../GenericPressable';
import { TDefaultRendererProps } from '../shared-types';

export default function useAnchorProps<T extends TNode>(
  props: TDefaultRendererProps<T>
): TDefaultRendererProps<T> & { onPress?: GenericPressableProps['onPress'] } {
  const { tnode } = props;
  const { onLinkPress } = useSharedProps();
  const syntheticAnchorOnLinkPress = extractAnchorOnLinkPress(
    tnode,
    onLinkPress
  );
  if (typeof syntheticAnchorOnLinkPress !== 'function') {
    return props;
  }
  return {
    ...props,
    onPress: syntheticAnchorOnLinkPress
  };
}
