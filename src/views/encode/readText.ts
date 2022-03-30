import { h, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
export const readText = () => {
  const text = ref('');
  const localData: any = {
    cb: null,
  };
  const getPaste = async () => {
    try {
      console.log(await navigator.clipboard);

      const pText = await navigator.clipboard.readText();
      return pText;
    } catch (error) {
      throw error;
    }
  };
  const fnPaste = async () => {
    const pText = await getPaste();
    if (!pText) return;
    text.value = pText;
    const maxLength = 17;
    let tipText = pText;
    if (pText.length > maxLength) {
      tipText = pText.substring(0, maxLength) + '...';
    }

    message.info(
      h('span', { title: pText }, [
        `将剪贴板 “${tipText}”`,
        h(
          'span',

          {
            class: 'a-link',
            onClick: () => {
              localData?.cb(text.value);
            },
          },
          '快捷粘贴'
        ),
      ]),
      1.5
    );
  };
  const onClickPaste = (cb?: (t: string) => void) => {
    localData.cb = cb;
  };
  onMounted(async () => {
    try {
      await fnPaste();
    } catch (error) {
      console.log('获取剪切板权限失败！打开权限可获取更好的体验～～');
    }
  });
  return [onClickPaste, getPaste];
};
