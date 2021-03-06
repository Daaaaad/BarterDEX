import React from 'react'
import { inject, observer } from 'mobx-react'
import { Modal } from '../';

@inject('app')
@observer
class CoinPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPickerOpen: true
        }
    }

    setTrade = (coin) => {
        const { setTrade } = this.props.app.portfolio;
        setTrade(coin, this.props.type);
        // autoclose after selection
        this.props.onClose && this.props.onClose()
    }

    render() {
        const { installedCoins, tradeBase, tradeRel } = this.props.app.portfolio;
        const currentTrade = { tradeBase, tradeRel };
        const notSelf = this.props.type === 'Rel' ? 'tradeBase' : 'tradeRel';
        const nonZeroBalance = installedCoins.filter((item) => item.balance > 0 && item.coin !== currentTrade[notSelf].coin);

        return (
          <Modal show={this.state.isPickerOpen} title={this.props.title} onClose={this.props.onClose}>
            <div className="coinList">
              {
                      nonZeroBalance.map((coin) => (
                        <button key={coin.coin} onClick={() => this.setTrade(coin)} className={`coinList-coin withBorder ${coin.coin}`}>
                          <div className="coinList-wrapper">
                            <div className="coinList-coin-logo coin-colorized">{ coin.icon }</div>
                            <div className="coinList-coin-name">
                              <h2 className="coin-colorized">
                                { coin.name }
                                <small>{ coin.smartaddress }</small>
                              </h2>
                              <code className="coin-colorized">{ coin.coin }</code>
                            </div>
                          </div>
                        </button>))
                  }
            </div>
          </Modal>
        )
    }
}

export default CoinPicker
