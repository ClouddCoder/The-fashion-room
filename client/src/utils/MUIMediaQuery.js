import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Returns the screen size.
 * @returns {string} The screen size.
 */
export function checkScreenSize() {
  let screenSize = "phone";
  const tablet = useMediaQuery("(min-width:601px)");
  const desktop = useMediaQuery("(min-width:992px)");
  const largeDevices = useMediaQuery("(min-width:1200px)");

  if (tablet) {
    screenSize = "tablet";
  }

  if (desktop) {
    screenSize = "desktop";
  }

  if (largeDevices) {
    screenSize = "largeDevices";
  }

  return screenSize;
}

/**
 * Returns the MUI props based on the screen size.
 * @param {object} phoneStyle - The MUI props for the phone.
 * @param {object} tabletStyle - The MUI props for the tablet.
 * @param {object} desktopStyle - The MUI props for the desktop.
 * @param {object} largeDevicesStyle - The MUI props for the large devices.
 * @returns
 */
export function getMUIprops(
  phoneStyle,
  tabletStyle,
  desktopStyle,
  largeDevicesStyle,
) {
  const screenSize = checkScreenSize();

  if (screenSize === "phone") {
    return phoneStyle;
  }

  if (screenSize === "tablet") {
    return tabletStyle;
  }

  if (screenSize === "desktop") {
    return desktopStyle;
  }

  if (screenSize === "largeDevices") {
    return largeDevicesStyle;
  }
}
