function getStates() {
  return [
    {
      state: 'record',
      config: {
        parent: 'containerPageView',
        url: '/record/*bcid',
        component: 'fimsRecord',
        resolve: {
          record: /* @ngInject */ (
            RecordService,
            $stateParams,
            $state,
            $window,
          ) => {
            const { bcid } = $stateParams;
            const re = new RegExp(/^ark:\/\d{5}\/[A-Za-z]+2$/);

            // bcid is a root identifier, so redirect to ezid metadata
            if (re.exec(bcid.trim())) {
              $window.location.href = `https://ezid.cdlib.org/id/${bcid}`;
              return false;
            }

            return RecordService.get(bcid.trim())
              .then(response => {
                if (response.status === 204) {
                  $state.go('notFound', { path: '404' });
                }

                return response.data;
              })
              .catch(() => $state.go('notFound', { path: '404' }));
          },
        },
      },
    },
  ];
}

export default ($transitions, routerHelper) => {
  'ngInject';

  routerHelper.configureStates(getStates());
};
