import Taro from '@tarojs/taro';

const NAVIGATOR_HEIGHT = 48;
const TAB_BAR_HEIGHT = 50;

/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度（例如可能没减去 statusBar 的高度），需二次计算
 * @param {*} showTabBar
 */
export function getPageHeight(showTabBar = true): any {
  const info: any = Taro.getSystemInfoSync();
  const { windowHeight, statusBarHeight, titleBarHeight } = info;
  const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0;
  if (process.env.TARO_ENV === 'rn') {
    return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight;
  }

  if (process.env.TARO_ENV === 'h5') {
    return `${windowHeight - tabBarHeight}px`;
  }

  if (process.env.TARO_ENV === 'alipay') {
    // NOTE 支付宝比较迷，windowHeight 似乎是去掉了 tabBar 高度，但无 tab 页跟 tab 页返回高度是一样的
    return `${windowHeight -
      statusBarHeight -
      titleBarHeight +
      (showTabBar ? 0 : TAB_BAR_HEIGHT)}px`;
  }

  return `${windowHeight}px`;
}
