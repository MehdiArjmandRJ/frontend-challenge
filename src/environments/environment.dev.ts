const envPrefix = 'dev-';

export const environment = {
  production: false,
  name: 'dev',
  orderUrl: `https://${envPrefix}order-rpt.nsedna.com/api`,
  orderCmd: `https://${envPrefix}ordercmd.nsedna.com/api`,
  commissionUrl: `https://${envPrefix}commision.nsedna.com/api`,
  cashflowUrl: `https://${envPrefix}cashflow.nsedna.com/api`,
  baseCashflowUrl: `https://${envPrefix}cashflow.nsedna.com`,
  cashRequestUrl: `https://${envPrefix}cashrequest.nsedna.com/api`,
  captchaApi: `https://${envPrefix}captcha.nsedna.com/api`,
  cmanager: `https://${envPrefix}cmanager.nsedna.com/api`,
  cmanagerBaseUrl: `https://${envPrefix}cmanager.nsedna.com`,
  fileServerUrl: `https://${envPrefix}filemanager.nsedna.com/api`,
  intradayPortfolio: `https://${envPrefix}intradayportfolio-api.nsedna.com/api`,
  instrumentUrl: `https://mdp.nsedna.com/api`,
  icpsUrl: `https://${envPrefix}icps.nsedna.com/api`,
  omsUrl: `https://${envPrefix}oms.nsedna.com`,
  idpBaseUrl: `https://${envPrefix}idp.nsedna.com`,
  apiSiteUrl: 'https://apitse.nsedna.com',
  msgStreamerUrl: `https://${envPrefix}msgstreamer.nsedna.com`,
  ipgUrl: `https://${envPrefix}ipg.nsedna.com`,
  orderEventUrl: `https://${envPrefix}order-rpt.nsedna.com`,
  sejamUrl: `https://${envPrefix}register.nsedna.com`,
  oauthBaseUrl: `https://${envPrefix}oauth.nsedna.com`,
  calenderUrl: 'https://calendar.nsedna.com'
};
