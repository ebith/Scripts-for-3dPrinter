require('dotenv').config();
const {get, post} = require('httpie');
const tpLink = new (require('tplink-smarthome-api')).Client();

(async () => {
  const plug = tpLink.getPlug({host: process.env.PLUG_HOST});

  const {data} = await get(`http://${process.env.OCTOPI_HOST}/api/printer?exclude=temperature,sd`, {
    headers: {'X-Api-Key': process.env.API_KEY}
  }).catch(async () => {
    await plug.setPowerState(false);
    process.exit();
  });
  if (!data.state.flags.printing) {
    await post(`http://${process.env.OCTOPI_HOST}/api/system/commands/core/shutdown`, {
      headers: {'X-Api-Key': process.env.API_KEY}
    });

    setTimeout(async () => {
      await plug.setPowerState(false);
    }, 30 * 1000);
  }
})();
