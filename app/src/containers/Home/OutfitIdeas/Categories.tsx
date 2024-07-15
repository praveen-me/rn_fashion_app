import React from 'react';
import {View, ScrollView} from 'react-native';
import Category from './Category';

const categories = [
  {
    id: 'newin',
    title: 'New In',
    color: '#ffe8e9',
  },
  {
    id: 'summer',
    title: 'Summer',
    color: '#f1e0ff',
  },
  {
    id: 'activewear',
    title: 'Active Wear',
    color: '#bfeaf5',
  },
  {
    id: 'outlet',
    title: 'Outlet',
    color: '#f1e0ff',
  },
  {
    id: 'accesories',
    title: 'Accesories',
    color: '#ffe8e9',
  },
];

const Categories = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Category {...category} key={category.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
