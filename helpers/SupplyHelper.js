var BigNumber = require('bignumber.js');

module.exports = {
    /**
     *
     * @param {Number} height
     * @return {BigNumber}
     */
    getTotalSupplyByHeight: function (blockHeight) {
        var subsidy = 70;
        var supply = 0;

        if (blockHeight > rewardSteps[0].height) {
          supply = subsidy * rewardSteps[0].height;
        } else {
          supply = subsidy * blockHeight;
        }
        // console.log('initial supply', supply);

        for (var i = 0; i < rewardSteps.length; i++) {
          // console.log(blockHeight, rewardSteps[i].height);
          if (blockHeight > rewardSteps[i].height) {
            if (i > 0) {
              // console.log('---');
              // console.log('step', rewardSteps[i-1].step);
              subsidy = subsidy - rewardSteps[i-1].step;
              // console.log('nextSubsidy', subsidy);
              var supplyIncrement = 0;
              if (blockHeight > rewardSteps[i].height) {
                // console.log('window', (rewardSteps[i].height - rewardSteps[i-1].height), 'blocks');
                supplyIncrement = subsidy * (rewardSteps[i].height - rewardSteps[i-1].height)
                // console.log('supplyIncrement', supplyIncrement);
              }
              supply += supplyIncrement;
            }
          } else {
            // console.log('---');
            // console.log('step', rewardSteps[i-1].step);
            // console.log('window', (blockHeight - rewardSteps[i-1].height), 'blocks');
            subsidy = subsidy - rewardSteps[i-1].step;
            // console.log('nextSubsidy', subsidy);
            supplyIncrement = subsidy * (blockHeight - rewardSteps[i-1].height);
            // console.log('supplyIncrement', supplyIncrement);
            supply += supplyIncrement;
            i = rewardSteps.length;
          }
        }

        return new BigNumber(supply);
    }

};
