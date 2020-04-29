/* eslint-disable react/prop-types */
import React from 'react';
import { LocationsPredictionProvider } from '../context/LocationsPrediction';
import { LocationProvider } from '../context/LocationContext';
import { ModalProvider } from '../context/UseModal';
import { LoadingProvider } from '../context/UseLoading';
import { SearchProvider } from '../context/SearchContext';
import { SelectFormProvider } from '../context/SelectFormContext';
import { DeliveryPickupModeProvider } from '../context/DeliveryPickupContext';


const ContextProviders = ({ children }) => (
  <LocationsPredictionProvider>
    <LocationProvider>
      <LoadingProvider>
        <ModalProvider>
          <SearchProvider>
            <SelectFormProvider>
              <DeliveryPickupModeProvider>
                {children}
              </DeliveryPickupModeProvider>
            </SelectFormProvider>
          </SearchProvider>
        </ModalProvider>
      </LoadingProvider>
    </LocationProvider>
  </LocationsPredictionProvider>
);

export default ContextProviders;
