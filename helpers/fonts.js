import fontFaceObserver from "fontfaceobserver";

const fonts = async () => {
  const montserrat = new fontFaceObserver("Montserrat");
  await montserrat.load();
  document.documentElement.classList.add("montserrat-load");
};

export default fonts;
