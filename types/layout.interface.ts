import type { MenuProps } from "antd";

export interface SiderProps {
  selectedIndex: MenuProps["onClick"];
  selectedKey: string[];
  items: any[];
}

export interface ContentProps {
  selectedKey: string;
  children?: React.FC[];
}
