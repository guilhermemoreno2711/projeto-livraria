import React, { useEffect } from 'react';

import mock from '../../../mocks/categoriesMocks.json'

//-----Components
import Category from '../../../components/Category/Category';
import BannerSlider from '../../../components/Banner/Banner';
import WhatsappContact from '../../../components/WhatsappContact/WhatsappContact';

import './HomePage.scss';

function HomePage() {
  const category1 = mock.data[0];
  const category2 = mock.data[1];
  const allCategories = mock.data;

  return (
    <div className='home-page'>
      <BannerSlider />
      <section>
        <Category
          data={category1.items}
          id={category1.id}
          name={category1.name.charAt(0).toUpperCase() + category1.name.slice(1)}
          categoryColor='pink'
        />

        <Category
          data={category2.items}
          id={category2.id}
          name={category2.name.charAt(0).toUpperCase() + category2.name.slice(1)}
          categoryColor='green'
        />

        <Category
          data={allCategories}
          name='Compre por Categoria'
          categoryColor='blue'
          showOnlyCategories
        />
      </section>

      <WhatsappContact />
    </div>
  );
}

export default HomePage;