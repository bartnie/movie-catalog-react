import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';
// Context
import { LoginContext } from '../../context';

const Header: React.FC = () => {
    const { user } = useContext(LoginContext);
    console.log(user);

    return (
        <Wrapper>
            <Content>
                <Link to='/'>
                    <LogoImg src={RMDBLogo} alt='rmdb-logo' />
                </Link>
                {user
                    ? (<span>Welcome: {user.username}</span>)
                    : (<Link to='/login'>
                        <span>Log in</span>
                    </Link>)
                }
                <TMDBLogoImg src={TMDBLogo} alt='tmdb-log' />
            </Content>
        </Wrapper>
    );
};

export default Header;