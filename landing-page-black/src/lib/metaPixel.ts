import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "1762335524712481";

const options = {
  autoConfig: true, // Ativa as configurações automáticas do Facebook Pixel
  debug: true, // define true se quiser logs no console
};

export const initFacebookPixel = () => {
  try {
    ReactPixel.init(PIXEL_ID, undefined, options);
    ReactPixel.pageView();
    console.log("✅ Facebook Pixel conectado com sucesso! ID:", PIXEL_ID);

    // Rastreia o PageView apenas uma vez
    ReactPixel.pageView();
    console.log("✅ PageView enviado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar Facebook Pixel:", error);
  }
};

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
) => {
  try {
    // Usa trackCustom para eventos personalizados (não padrão)
    ReactPixel.trackCustom(eventName, eventData);
    console.log("✅ Evento enviado com sucesso:", eventName, eventData || {});
  } catch (error) {
    console.error("❌ Erro ao rastrear evento:", error);
  }
};

// Função para eventos padrão do Facebook (Purchase, AddToCart, etc)
export const trackStandardEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
) => {
  try {
    ReactPixel.track(eventName, eventData);
    console.log(
      "✅ Evento padrão enviado com sucesso:",
      eventName,
      eventData || {}
    );
  } catch (error) {
    console.error("❌ Erro ao rastrear evento padrão:", error);
  }
};
