/// <reference types="react-scripts" />
declare module "*.md" {
  const src: string;
  export default src;
}

declare module "*.ico" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
