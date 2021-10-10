import PropTypes from 'prop-types';

import { Button, Result } from 'antd';

const Home = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

Home.propTypes = {

};

export default Home;
