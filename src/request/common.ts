// 生成_su公参
export function createSu(): string {
  return `${new Date().getTime()}ehll${parseInt(`${Math.random() * (10000000000 + 1)}`, 10)}`;
}
