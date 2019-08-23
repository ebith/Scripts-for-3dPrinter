require('dotenv').config();
const {post} = require('httpie');
const tpLink = new (require('tplink-smarthome-api')).Client();

(async () => {
  const plug = tpLink.getPlug({host: process.env.PLUG_HOST});

  const response = await post(`http://${process.env.OCTOPI_HOST}/api/system/commands/core/shutdown`, {
    headers: {'X-Api-Key': process.env.API_KEY}
  });

  setTimeout(async () => {
    await plug.setPowerState(false);
  }, 30 * 1000);
})();
