import axios from 'axios';
import { client } from '../index';
import { logError } from './errorLogger';

(async function initPatreonIntegration() {
  const {
    PATREON_TOKEN,
    PATREON_CAMPAIGN_ID,
    GUILD_ID,
    PATREON_ROLE_ID,
  } = process.env;
  if (!PATREON_TOKEN || !PATREON_CAMPAIGN_ID || !GUILD_ID || !PATREON_ROLE_ID) return;

  const API_URL = `https://www.patreon.com/api/oauth2/v2/campaigns/${PATREON_CAMPAIGN_ID}/members`;
  const INTERVAL = 60 * 60 * 1000; // 1h

  async function syncMembers() {
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${PATREON_TOKEN}` },
      });
      const members = data.data;
      const guild = client.guilds.cache.get(GUILD_ID!);
      if (!guild) return;

      for (const m of members) {
        const discordId = m.relationships?.user?.data?.id;
        if (!discordId) continue;
        const member = await guild.members.fetch(discordId).catch(() => null);
        if (member && !member.roles.cache.has(PATREON_ROLE_ID!)) {
          await member.roles.add(PATREON_ROLE_ID!);
        }
      }
    } catch (e: any) {
      logError('patreonSyncError', e);
    }
  }

  client.once('ready', () => {
    syncMembers();
    setInterval(syncMembers, INTERVAL);
  });
})();
