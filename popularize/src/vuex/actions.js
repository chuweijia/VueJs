/**
 * Created by Xcar on 2016/9/9.
 */
export const updateListData = makeAction('UPDATE_LIST_DATA')
export const addBrandData = makeAction('ADD_BRAND_DATA')
export const addCityData = makeAction('ADD_CITY_DATA')
export const updateMoreOptions = makeAction('UPDATE_MORE_OPTIONS')
export const updateCityId = makeAction('UPDATE_CITY_ID')
export const updateDealerData = makeAction('UPDATE_DEALER_DATA')
export const updatePserData = makeAction('UPDATE_PSER_DATA')
export const updateRecommendData = makeAction('UPDATE_RECOMMEND_DATA')


function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
