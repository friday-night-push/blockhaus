import React, { useEffect, useState } from 'react';

import { Link, Text } from '@gravity-ui/uikit';

export const Geolocation = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [mapLink, setMapLink] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const geoFindMe = () => {
    setStatus('Ищем геолокацию пользователя...');

    if (!navigator.geolocation) {
      setStatus('Геолокация не поддерживается вашим браузером');
      return;
    }

    const success = async (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${longitude},${latitude}&apikey=d7fd5843-8814-47ac-a3a2-cb45b30293fb`
        );
        const data = await response.json();
        const address =
          data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.text;

        setStatus(null);
        setAddress(address);
        setMapLink(
          `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=18&l=map`
        );
      } catch (error) {
        setStatus('Не удалось получить адрес');
      }
    };

    const error = () => {
      setStatus('Не удалось получить информацию о местоположении');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };
  useEffect(() => {
    geoFindMe();
  }, []);

  return (
    <>
      <Text variant="body-short" color="info">
        {status}
      </Text>
      {mapLink && address && (
        <Link
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          view={'secondary'}>
          {address}
        </Link>
      )}
    </>
  );
};
