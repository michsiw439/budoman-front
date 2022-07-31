import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_PRODUCTS_CATHEGORIES } from '../../graphql/queries/allProductsCathegories.js';
import { LOGOUT_USER } from '../../graphql/mutations/user.js';
// import { mappedProductsCathegoriesName } from './helpers';
import { countTotalPrice } from '../../utils/price.js';
import { STORAGE_URL } from '../../constants/environment.js';
import { menuItemsProperties } from './data.js';

const TopBar = () => {
  const blockName = 'top-bar';
  const { data } = useQuery(ALL_PRODUCTS_CATHEGORIES);
  const productsInBasket = useSelector(({ basket: { addedProducts } }) => addedProducts);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const productsCathegories = data?.productsCathegories;

  const handleLogoutUser = () => {
    const userID = localStorage.getItem('userID');
    const payload = { input: { id: userID } };

    logoutUser({ variables: payload });
  };

  /* eslint-disable no-console */
  console.log('productsCathegories', productsCathegories);
  /* eslint-enable no-console */

  return (
    <nav className={blockName}>
      <div className={`${blockName}__logo`}>
        <Link to="/">
          <img src={`${STORAGE_URL}/images/logo.svg`} alt="Budoman logo" className={`${blockName}__logo-img`} />
        </Link>
      </div>
      <div className={`${blockName}__search-engine`}>
        <input type="text" className={`${blockName}__search-engine-input`} />
      </div>
      <div className={`${blockName}__login`}>
        <Link to="/login">
          Logowanie
        </Link>
        <div
          onMouseDown={handleLogoutUser}
          role="button"
          tabIndex={0}
        >
          Wyloguj
        </div>
      </div>
      <div className={`${blockName}__menu`}>
        <ul className={`${blockName}__menu-list`}>
          {
            menuItemsProperties.map(({ path, name }) => (
              <li
                className={`${blockName}__list-item`}
                key={`${blockName}__item-link-${name}`}
              >
                <Link to={path} className={`${blockName}__item-link`}>
                  {name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={`${blockName}__basket`}>
        <i className={`${blockName}__basket-icon icon-shop-basket`} />
        {countTotalPrice(productsInBasket)}
      </div>
    </nav>
  );
};

export default TopBar;