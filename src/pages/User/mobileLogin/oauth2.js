import React, { Component } from 'react';
import { connect } from 'dva';

class Page extends Component {
  state = {};

  componentDidMount = () => {
    const {
      location: { query },
      dispatch,
    } = this.props;
    dispatch({
      type: 'oauth2/init',
    });

    if (query) {
      if (query.code && query.state) {
        dispatch({
          type: 'oauth2/getThirdparty',
          payload: { code: query.code, thirdparty: query.state, query },
        });
      }
    }
  };

  render() {
    const {
      // loading,
      oauth2: { error },
    } = this.props;
    if (error) {
      return <span>{error}</span>;
    }

    return (
      <div
        style={{
          width: '300px',
          height: '100%',
          margin: '0 auto',
          marginTop: '50px',
          textAlign: 'center',
          padding: '15px',
        }}
      >
        <h1>自动登入中...</h1>
      </div>
    );
  }
}
export default connect(({ oauth2, loading }) => ({
  oauth2,
  loading: loading.effects['oauth2/getThirdparty'],
}))(Page);
