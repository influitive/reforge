const mergeValidProperties = (array, prop) => {
  return array.reduce((total, object) => {
    if (object[prop]) {
      return {
        ...total,
        ...object[prop]
      };
    }
    return total;
  }, {});
};

const mergeValidArrays = (array, prop) => {

  return array.reduce((total, object) => {
    if (object[prop]) {
      if (Array.isArray(object[prop])) {
        return [
          ...total,
          ...object[prop]
        ];
      }
      return total.concat(object[prop]);
    }
    return total;
  }, []);
};

export default (...providers) => {
  const actions = mergeValidProperties(providers, 'actions');
  const reducers = mergeValidProperties(providers, 'reducers');
  const merge = mergeValidProperties(providers, 'merge');
  const middleware = mergeValidArrays(providers, 'middleware');
  const enhancer = mergeValidArrays(providers, 'enhancer');
  const onReady = mergeValidArrays(providers, 'onReady');
  const onInstantiated = mergeValidArrays(providers, 'onInstantiated');
  const state = mergeValidProperties(providers, 'state');
  return {
    actions,
    reducers,
    merge,
    middleware,
    enhancer,
    onReady,
    onInstantiated,
    state
  };
};
