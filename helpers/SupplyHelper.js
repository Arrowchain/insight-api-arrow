var BigNumber = require('bignumber.js');

module.exports = {
    /**
     *
     * @param {Number} height
     * @return {BigNumber}
     */
    getTotalSupplyByHeight: function (blockHeight) {

        var sum = 125000;
        if (blockHeight >= 20000) {
          sum = sum + ((blockHeight - 19999) * 12.5)
          if (blockHeight >= 653600) {
            sum = sum - ((blockHeight - 653599) * 12.5)
          }
        }
        if (blockHeight >= 653600 && blockHeight < 840000) {
          sum = sum + ((blockHeight - 653599) * 6.25)
      
        }
        var coins = sum;
    
        var supply = new BigNumber(coins); // TODO FIXME This is accurate only for blockheight > 20000

        return supply;
    }

};
