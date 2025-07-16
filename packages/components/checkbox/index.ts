import _Checkbox from "./src/checkbox.vue"
import { withInstall } from "@wyj-ui/utils/with-install"

const Checkbox = withInstall(_Checkbox)
export default Checkbox
export type * from "./src/checkbox.ts"
declare module 'vue' {
 export interface GlobalComponents {
  WCheckbox: typeof Checkbox
 } 
}