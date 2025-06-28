import _VirtualList from './src/virtual-list'
import { withInstall } from "@wyj-ui/utils/with-install"
const  VirtualList = withInstall(_VirtualList)
export default VirtualList

declare module 'vue' {
 export interface GlobalComponents {
  WVirtualList: typeof VirtualList 
 } 
}