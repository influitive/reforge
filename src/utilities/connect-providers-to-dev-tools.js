import values from 'lodash.values';
import { pushEnhancer, pushMiddleware } from 'react-redux-provide';
import createLogger from 'redux-logger';

const ignoredActions = ['EFFECT_RESOLVED', 'EFFECT_TRIGGERED'];

const config = {
  devtools: {
    actionsBlacklist: ignoredActions
  },
  logger: {
    collapsed: true,
    predicate: (_, action) => !ignoredActions.includes(action.type)
  }
};

function connectDevtools(providers) {
  if (window.devToolsExtension) {
    values(providers).forEach(provider => {
      pushEnhancer(
        { provider },
        window.devToolsExtension(config.devtools)
      );
    });
  }
}


function connectLogger(providers) {
  pushMiddleware(providers, createLogger(config.logger));
}

export default function(providers) {
  if (process.env.NODE_ENV !== 'production') {
    connectDevtools(providers);
    if (window.devToolsExtension) connectLogger(providers);
  }
}
