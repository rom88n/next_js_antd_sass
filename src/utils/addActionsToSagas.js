export const getActions = [];
export const postActions = [];
export const putActions = [];
export const patchActions = [];
export const deleteActions = [];
export const parallelActions = [];

export const addActionsToSagas = actions => {
  actions.forEach(action => {
    switch (true) {
      case action.REQUEST.includes('PARALLEL'):
        parallelActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('GET'):
        getActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('POST'):
        postActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('PUT'):
        putActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('PATCH'):
        patchActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('DELETE'):
        deleteActions.push(action.REQUEST);
        break;
      default:
        break;
    }
  });
};
