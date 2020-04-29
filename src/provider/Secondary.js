/* eslint-disable react/prop-types */
import React from 'react';
import { BusinessesProvider } from '../context/BusinessesContext';
import { BusinessCategoriesProvider } from '../context/BusinessCategoriesContext';
import { BusinessGroupProvider } from '../context/BusinessGroupContext';
import { CompanyProvider } from '../context/CompanyContext';
import { ProductsProvider } from '../context/ProductsContext';
import { UserProvider } from '../context/UserContext';
import { CartProvider } from '../context/CartContext';


const ContextProviders = ({ children }) => (
  <BusinessesProvider>
    <BusinessCategoriesProvider>
      <BusinessGroupProvider>
        <CompanyProvider>
          <ProductsProvider>
            <UserProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </UserProvider>
          </ProductsProvider>
        </CompanyProvider>
      </BusinessGroupProvider>
    </BusinessCategoriesProvider>
  </BusinessesProvider>
);

export default ContextProviders;
