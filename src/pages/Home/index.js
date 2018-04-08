import React from 'react';
import styled from 'styled-components';

import SnapScroll from '../../components/SnapScroll';
import ProjectAlpha from '../ProjectAlpha';

const Home = () => (
  <div>
    <SnapScroll sections={[ProjectAlpha, Section2, Section3]} />
  </div>
);

const Section1 = styled.div`
  border: 10px solid black;
`;

const Section2 = styled.div`
  border: 10px solid red;
`;

const Section3 = styled.div`
  border: 10px solid white;
  background-color: black;
`;

export default Home;
