/**
Create by Kurama
Github.com/Kurama250
Licence : Creative commons - CC BY-NC-ND 4.0
*/

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setPresence({ activities: [{ name: 'Github.com/Kurama250' }], status: 'dnd' });
    console.log('--------------------------------------------------');
    console.log('            Create by github.com/Kurama250               ');
    console.log('Licence : Creative commons - CC BY-NC-ND 4.0 by Kurama250');
    console.log('---------------------------------------------------------');
    console.log(`Connected in as ${client.user.tag}`);
    console.log('--------------------------------------------------');

    client.guilds.cache.forEach(guild => {
      console.log(`- ${guild.name} (ID: ${guild.id}): ${guild.memberCount} members`);
    });
  }
};
