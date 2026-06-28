// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export function binarySearch(arr: number[], key: number): number {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    let low = 0;
    let high = stryMutAct_9fa48("1") ? arr.length + 1 : (stryCov_9fa48("1"), arr.length - 1);
    while (stryMutAct_9fa48("4") ? low > high : stryMutAct_9fa48("3") ? low < high : stryMutAct_9fa48("2") ? false : (stryCov_9fa48("2", "3", "4"), low <= high)) {
      if (stryMutAct_9fa48("5")) {
        {}
      } else {
        stryCov_9fa48("5");
        const mid = Math.floor(stryMutAct_9fa48("6") ? (low + high) * 2 : (stryCov_9fa48("6"), (stryMutAct_9fa48("7") ? low - high : (stryCov_9fa48("7"), low + high)) / 2));
        if (stryMutAct_9fa48("10") ? arr[mid] !== key : stryMutAct_9fa48("9") ? false : stryMutAct_9fa48("8") ? true : (stryCov_9fa48("8", "9", "10"), arr[mid] === key)) return mid;
        if (stryMutAct_9fa48("14") ? arr[mid] >= key : stryMutAct_9fa48("13") ? arr[mid] <= key : stryMutAct_9fa48("12") ? false : stryMutAct_9fa48("11") ? true : (stryCov_9fa48("11", "12", "13", "14"), arr[mid] < key)) low = stryMutAct_9fa48("15") ? mid - 1 : (stryCov_9fa48("15"), mid + 1);else high = stryMutAct_9fa48("16") ? mid + 1 : (stryCov_9fa48("16"), mid - 1);
      }
    }
    return stryMutAct_9fa48("17") ? +1 : (stryCov_9fa48("17"), -1);
  }
}