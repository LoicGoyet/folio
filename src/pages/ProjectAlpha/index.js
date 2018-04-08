import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class ProjectAlpha extends React.Component {
  static defaultProps = {
    preview: false,
  };

  static propTypes = {
    preview: PropTypes.bool,
  };

  render() {
    const { preview } = this.props;

    return (
      <section>
        <Cover>
          <HomeContent>
            <HomeContentTitle>ProjectAlpha</HomeContentTitle>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint iste atque aliquam corrupti culpa non quia
              fugit, ipsam nihil soluta illum asperiores. Voluptate architecto, facilis iste porro delectus dicta
              tenetur!
            </p>
            <Link to="/alpha">Voir le projet</Link>
          </HomeContent>
        </Cover>

        {preview === false && <Content>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Content>}
      </section>
    );
  }
}

export default ProjectAlpha;

const Cover = styled.div`
  border: 10px solid white;
  background-size: cover;
  background-position: center;
  background-image: url('https://bnetcmsus-a.akamaihd.net/cms/blog_header/c2/C2VX0M89KR7K1515459429079.jpg');
  height: 100vh;
  position: relative;
`;

const HomeContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 50%;
  background-color: white;
  padding: 10px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HomeContentTitle = styled.h1`
  font-size: 20px;
  margin: 0 0 1em;
`;

const Content = styled.div`
  background-color: red;
  padding: 10px;
`;
