const xs = 20; // 320px
const sm = 48; // 768px
const md = 62; // 992px
const lg = 75; // 1200px
const xlg = 90; // 1440px
const singlePx = 0.0625;

// Basic breakpoint values
// Example use in js:
// @media ${props => props.rdsTheme.breakpoints.xsMinMax} {
//    ..stuff you want to happen on screens between 320px and 768px;
// }

const breakpoints = {
  // Sizes
  xs,
  sm,
  md,
  lg,
  // Min/Max Values
  xsMinMax: `only screen and (min-width: ${xs}rem) and (max-width: ${sm}rem)`,
  smMinMax: `only screen and (min-width: ${sm + singlePx}rem) and (max-width: ${md}rem)`,
  mdMinMax: `only screen and (min-width: ${md + singlePx}rem) and (max-width: ${lg}rem)`,
  smMin: `screen and (min-width: ${sm + singlePx}rem)`,
  mdMin: `screen and (min-width: ${md + singlePx}rem)`,
  lgMin: `screen and (min-width: ${lg + singlePx}rem)`,
  xlgMin: `screen and (min-width: ${xlg + singlePx}rem)`,
  // Max Only Values
  smOnly: `only screen and (max-width: ${sm}rem)`,
  mdOnly: `only screen and (max-width: ${md}rem)`,
  lgOnly: `only screen and (max-width: ${lg}rem)`,
  xlgOnly: `only screen and (max-width: ${xlg}rem)`,
};

export default breakpoints;
