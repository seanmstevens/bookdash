import React from 'react'
import Router from 'next/router'
import { retrieveSession } from '../../src/redux/actions'
import { connect } from 'react-redux'

class Callback extends React.Component {
  static async getInitialProps({ req, store }) {
    store.dispatch(retrieveSession({ req, force: true }))
  }

  componentDidMount () {
    // Get latest session data after rendering on client then redirect.
    // The ensures client state is always updated after signing in or out.
    this.props.dispatch(retrieveSession({ force: true }))
    if (window.opener && window.opener !== window) {
      window.close()
    } else {
      Router.replace('/')
    }
  }

  render() {
    // Provide a link for clients without JavaScript as a fallback.
    return (
      <React.Fragment>
        <style jsx global>{`
          body{ 
            background-color: #fff;
          }
          .circle-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            z-index: 100;
            text-align: center;
            transform: translate(-50%, -50%);
          }
          .circle-loader .circle {
            fill: transparent;
            stroke: rgb(33,150,243);
            stroke-width: 4px;
            animation: dash 2s ease infinite, rotate 2s linear infinite;
          }
          @keyframes dash {
            0% {
              stroke-dasharray: 1,95;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 85,95;
              stroke-dashoffset: -25;
            }
            100% {
              stroke-dasharray: 85,95;
              stroke-dashoffset: -93;
            }
          }
          @keyframes rotate {
            0% {transform: rotate(0deg); }
            100% {transform: rotate(360deg); }
          }
        `}</style>
        <a href="/" className="circle-loader">
          <svg className="circle" width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="15"/>
          </svg>
        </a>
      </React.Fragment>
    )
  }
}

export default connect()(Callback)