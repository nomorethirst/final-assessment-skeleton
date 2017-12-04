export function config($logProvider, $mdThemingProvider) {
  'ngInject'
  $logProvider.debugEnabled(true)
  // uncomment following line to allow default (light) theme
  $mdThemingProvider.theme('default').dark()
}
