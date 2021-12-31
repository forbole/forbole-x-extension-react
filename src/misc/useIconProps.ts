const useIconProps = (width?: number, fill?: string, fillDark?: string) => {
  return `w-${width ? width : 6} fill-${fill ? fill : "icon-light"} dark:fill-${
    fillDark ? fillDark : "icon-dark"
  } `;
};

export default useIconProps;
