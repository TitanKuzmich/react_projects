import HelveticaNeueRegular from "./HelveticaNeue-Roman.otf"
import HelveticaNeueMedium from "./HelveticaNeue-Medium.otf"
import HelveticaNeueBold from "./HelveticaNeue-Bold.otf"

const fonts = `
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueRegular});
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueRegular});
    font-weight: 100;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueRegular});
    font-weight: 200;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueRegular});
    font-weight: 300;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueRegular});
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueMedium});
    font-weight: 500;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueBold});
    font-weight: 600;
    font-style: normal;
    font-display: block;
  }
`

export default fonts
