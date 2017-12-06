import templateUrl from './citySearchInput.template.html'

const controller = class CitySearchInputController {
  constructor($log, flightService, $attrs) {
    'ngInject'
    this.logger = $log
    this.logger.log('citySearchInput is a go')
    this.isDisabled    = false

    // list of `city` value/display objects
    // this.cities        = this.loadAll()
    this.cities = [
      {
        value: 'memphis',
        display: 'MEMPHIS'
      },{
        value: 'nashville',
        display: 'NASHVILLE'
      },{
        value: 'chattanooga',
        display: 'CHATTANOOGA' 
      },{ 
        value: 'nashville',
        display: 'NASHVILLE'
      }
    ]
    this.noCache = true
    // this.logger.log($attrs)
    // this.placeholder = $attrs.placeholder
    // this.logger.log(this.placeholder)
  }

  querySearch (query) {
    return query ? this.cities.filter( this.createFilterFor(query) ) : this.cities
  }

  searchTextChange(text) {
    this.logger.info('Text changed to ' + text)
  }

  selectedItemChange(item) {
    if (item === undefined) {
      this.dirty = false
    } else {
      this.dirty = true
    }
    this.logger.info('Item changed to ' + JSON.stringify(item))
  }

  // /**
  //  * Build `cities` list of key/value pairs
  //  */
  // loadAll() {
  //   let allCities = 'Memphis, NASHVILLE, KNOXVILLE, CHATTANOOGA'

  //   return allCities.split(/, +/g).map( city => {
  //       value: city.toLowerCase(),
  //       display: city
  //     })
  // }

  /**
   * Create filter function for a query string
   */
  createFilterFor(query) {
    let lowercaseQuery = ng.lowercase(query);
    let filterFn = city => (city.value.indexOf(lowercaseQuery) === 0)
    return filterFn
    }

  }

export const CitySearchInput = {
  controller,
  templateUrl,
  controllerAs: 'citySearchInput',
  bindings: {
    placeholder: '@',
    input: '=',
    dirty: '='
  }
}