
export default class SiteNavMenu {
   /**
    * 菜单名称
    */
   public title: string = null

   /**
    * 链接
    */
   public link = '';

   /**
    * 子类
    */
   public childrens: SiteNavMenu[] = []

   constructor (config: {
      title: string;
      link?: string;
   }) {
      this.title = config.title;
      if (typeof config.link === 'string') { this.link = config.link; }
   }
}
