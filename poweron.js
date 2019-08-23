require('dotenv').config();
const tpLink = new (require('tplink-smarthome-api')).Client();

(async () => {
  const plug = tpLink.getPlug({host: process.env.PLUG_HOST});
  await plug.setPowerState(true);
})();
