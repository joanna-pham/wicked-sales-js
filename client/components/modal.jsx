import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      message: '',
      view: ''
    };
    // this.handleModal = this.handleModal.bind(this)
    // this.handleClick = this.handleClick.bind(this)
  }

  // componentDidMount(){
  //   this.handleModal()
  // }

  // handleModal() {
  //   if (this.props.view === 'checkout') {
  //     this.setState({
  //       message: 'This website is for DEMO purposes only. Please do not enter in personal information such as credit card or shipping address.',
  //     })
  //   } else if (this.props.view === 'catalog') {
  //     this.setState({
  //       message: 'This website is for DEMO purposes only. It is not a functioning shop.',
  //     })
  //   }
  // }

  // handleClick() {
  //   this.setState({ showModal: false });
  // }

  render() {

    return (
      <div>
        <div className={'modal fade' + (this.state.showModal ? ' show d-block' : ' d-none')} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ATTENTION<img src="/images/exclamation-point.png" className="ep-point"></img></h5>
              </div>
              <div className="modal-body">
                <p>This website is for DEMO purposes only. It is not a functioning shop. Please do not enter in personal information such as credit card or shipping address.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info" onClick={() => this.setState({ showModal: false })}>I Understand</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
