const fnIsPC = () => {
  if (!navigator) return false;
  //是否为PC端
  const userAgentInfo = navigator?.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash-es';

export function judgeEnv() {
  const isPc = ref(false);
  const fnResize = debounce(() => setSize(), 500);
  const setSize = () => {
    isPc.value = fnIsPC();
  };
  onMounted(() => {
    setSize();
    window.addEventListener('resize', fnResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', fnResize);
  });
  return [isPc];
}
