import React from "react";
import { ReactComponent as DarkModeIcon } from "../../assets/images/icons/icon_dark_mode.svg";
import { ReactComponent as LightModeIcon } from "../../assets/images/icons/icon_light_mode.svg";
// @ts-ignore
import nightwind from "nightwind/helper";

const ThemeModeButton = () => {
  return (
    <DarkModeIcon
      className="cursor-pointer w-6 fill-icon-light dark:fill-icon-dark"
      onClick={() => {
        nightwind.toggle();
      }}
    />
  );
};

export default ThemeModeButton;
